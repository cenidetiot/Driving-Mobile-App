package com.drivingapp.NgsiServices;

import android.Manifest;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;
import android.widget.Toast;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import www.fiware.org.ngsi.controller.ControllerSQLite;
import www.fiware.org.ngsi.controller.DeviceResources;
import www.fiware.org.ngsi.datamodel.entity.Device;
import www.fiware.org.ngsi.datamodel.entity.DeviceModel;
import www.fiware.org.ngsi.datamodel.model.DeviceUpdateModel;
import www.fiware.org.ngsi.db.sqlite.entity.Tbl_Data_Temp;
import www.fiware.org.ngsi.httpmethodstransaction.Response;
import www.fiware.org.ngsi.utilities.Constants;
import www.fiware.org.ngsi.utilities.DevicePropertiesFunctions;
import www.fiware.org.ngsi.utilities.Functions;

/**
 * Created by Cipriano on 11/6/2017.
 */

public class ServiceDevice extends Service implements DeviceResources.DeviceResourceMethods{
    private static final String STATUS = "Status";
    Context context;
    private double longitudeGPS, latitudeGPS, altitudeGPS;
    private float speedMS = 0, speedKmHr = 0;
    private LocationManager locationManager;
    private Functions functions = new Functions();
    private Device device = new Device();
    private DeviceResources deviceResources;
    private DevicePropertiesFunctions deviceProperties = new DevicePropertiesFunctions();
    private DeviceModel deviceModel = new DeviceModel();
    private ControllerSQLite controllerSQLite;
    Tbl_Data_Temp tblTemp = new Tbl_Data_Temp();
    private DeviceUpdateModel deviceUpdateModel = new DeviceUpdateModel();
    Tbl_Data_Temp deviceValidateExists;
    private String owner = "";
    //Obtenga la precisión de velocidad estimada de esta ubicación, en metros por segundo.
    //private float speedAccuracyms;
    //Devuelve la hora UTC de esta solución, en milisegundos desde el 1 de enero de 1970.
    private long time;
    //Obtenga la precisión vertical estimada de esta ubicación, en metros.
    //private float verticalAccuracy;
    //Obtenga la precisión horizontal estimada de esta ubicación, radial, en metros.
    private float accuracy;

    //Es true si esta ubicación tiene una velocidad.
    private boolean hasSpeed;

    public ServiceDevice() {

    }
    @Override
    public void onCreate() {
        super.onCreate();
        context = this;
        Log.d(STATUS, "Service created...!");
        controllerSQLite = new ControllerSQLite(context);
        deviceResources = new DeviceResources(this);

    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }


    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(STATUS, "Service started...!");
        owner = intent.getStringExtra(Constants.OWNER);
        Log.i("owner", owner);
        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {

        }
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, locationListenerGPS);
        return START_NOT_STICKY;
    }

    private final LocationListener locationListenerGPS = new LocationListener() {
        @RequiresApi(api = Build.VERSION_CODES.O)
        public void onLocationChanged(Location location) {
            longitudeGPS = (double)location.getLongitude();
            latitudeGPS = (double)location.getLatitude();
            altitudeGPS = (double)location.getAltitude();
            speedMS = (float) (location.getSpeed());
            speedKmHr = (float)(location.getSpeed() * 3.6);

            accuracy = (float)location.getAccuracy();
            //speedAccuracyms = (float)location.getSpeedAccuracyMetersPerSecond();
            time = (long) location.getTime();
            //verticalAccuracy = (float) location.getVerticalAccuracyMeters();

            hasSpeed = (boolean) location.hasSpeed();
            if (location != null) {
                Intent localIntent = new Intent(Constants.SERVICE_CHANGE_LOCATION_DEVICE).putExtra(Constants.DEVICE_GPS_RESULT_SPEED_MS, speedMS)
                        .putExtra(Constants.DEVICE_GPS_RESULT_SPEED_KMHR, speedKmHr);
                LocalBroadcastManager.getInstance(ServiceDevice.this).sendBroadcast(localIntent);
                device = createDevice(latitudeGPS, longitudeGPS, time, accuracy);
                tblTemp.setKeyword(device.getId());
                //tvLatitud.setText(""+latitudeGPS);
                //tvLongitud.setText(""+longitudeGPS);
                Log.i(STATUS, "Test Status");
                Log.i(STATUS, ""+speedMS+"m/s");
                Log.i(STATUS, ""+speedKmHr+"km/h");
                deviceValidateExists = controllerSQLite.getByKeywordTempCreate(tblTemp);
                if (deviceValidateExists == null) {
                    //Obtener los datos para para cargarlos en el Device

                    try {
                        deviceResources.createEntity(context, device.getId(),device);
                    } catch (Exception e) {
                        Log.i(STATUS, "Exception Device...!");
                        //Toast.makeText(getBaseContext(), "Exception Device...!", Toast.LENGTH_LONG).show();
                    }
                } else {
                    deviceUpdateModel = updateDevice(latitudeGPS, longitudeGPS, time, accuracy);
                    try {
                        deviceResources.updateEntity(context, device.getId(), deviceUpdateModel);
                    } catch (Exception e) {
                        Log.i(STATUS, "Exception Device Update...!");
                        //Toast.makeText(getBaseContext(), "Exception Device Update...!", Toast.LENGTH_LONG).show();
                    }
                }
            } else {
                Log.i(STATUS, "Error GPS...!");
                //Toast.makeText(getBaseContext(), "Error GPS...!", Toast.LENGTH_LONG).show();
            }
        }

        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {

        }

        @Override
        public void onProviderEnabled(String provider) {

        }

        @Override
        public void onProviderDisabled(String provider) {

        }
    };


    public Device createDevice(Double latitudeGPS, Double longitudeGPS, long time, float accuracy){
        Date date = new Date();
        DateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        Device device = new Device();
        device.setId("Device_Smartphone_"+deviceProperties.getAndroidId(context));
        device.getCategory().setValue("smartphone");
        device.getOsVersion().setValue(deviceProperties.getOSVersion());
        device.getBatteryLevel().setValue(deviceProperties.getBatteryLevel(context));
        device.getDateCreated().setValue(""+formatDate.format(date));
        device.getDateModified().setValue(""+formatDate.format(date));
        device.getIpAddress().setValue(deviceProperties.getIPAddress(true));
        /*device.getMnc().setValue(deviceProperties.getmnc(context));
        device.getMcc().setValue(deviceProperties.getmcc(context));
        if (deviceProperties.getMACAddress("wlan0").length() == 0 || deviceProperties.getMACAddress("wlan0").isEmpty()) {
            device.getMacAddress().setValue(deviceProperties.getMACAddress("wlan0"));
        } else {
            device.getMacAddress().setValue("wlan0");
        }*/
        device.getRefDeviceModel().setValue("DeviceModel_"+functions.getReplaceParent(deviceProperties.getBrand())+"_"+functions.getReplaceParent(deviceProperties.getModel()));
        device.getSerialNumber().setValue(deviceProperties.getSerialNumber());
        device.getOwner().setValue(owner);
        device.getLocation().setValue(latitudeGPS + ", " + longitudeGPS);
        device.getLatitude().setValue(latitudeGPS);
        device.getLongitude().setValue(longitudeGPS);
        device.getTime().setValue(time);
        device.getAccuracy().setValue(accuracy);
        //device.getSpeedAccuracyms().setValue(speedAccuracyms);
        //device.getVerticalAccuracy().setValue(verticalAccuracy);
        return device;
    }

    public DeviceUpdateModel updateDevice(Double latitudeGPS, Double longitudeGPS, long time, float accuracy){
        Date date = new Date();
        DateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        DeviceUpdateModel deviceUpdateModel = new DeviceUpdateModel();
        deviceUpdateModel.getCategory().setValue("smartphone");
        deviceUpdateModel.getOsVersion().setValue(deviceProperties.getOSVersion());
        deviceUpdateModel.getBatteryLevel().setValue(deviceProperties.getBatteryLevel(context));
        deviceUpdateModel.getDateModified().setValue(""+formatDate.format(date));
        deviceUpdateModel.getIpAddress().setValue(deviceProperties.getIPAddress(true));
        /*deviceUpdateModel.getMnc().setValue(deviceProperties.getmnc(context));
        deviceUpdateModel.getMcc().setValue(deviceProperties.getmcc(context));
        if (deviceProperties.getMACAddress("wlan0").length() == 0 || deviceProperties.getMACAddress("wlan0").isEmpty()) {
            deviceUpdateModel.getMacAddress().setValue(deviceProperties.getMACAddress("wlan0"));
        } else {
            deviceUpdateModel.getMacAddress().setValue("wlan0");
        }*/
        deviceUpdateModel.getRefDeviceModel().setValue("DeviceModel_"+functions.getReplaceParent(deviceProperties.getBrand())+"_"+functions.getReplaceParent(deviceProperties.getModel()));
        deviceUpdateModel.getSerialNumber().setValue(deviceProperties.getSerialNumber());
        deviceUpdateModel.getOwner().setValue(owner);
        deviceUpdateModel.getLocation().setValue(latitudeGPS + ", " + longitudeGPS);
        deviceUpdateModel.getLatitude().setValue(latitudeGPS);
        deviceUpdateModel.getLongitude().setValue(longitudeGPS);
        deviceUpdateModel.getTime().setValue(time);
        deviceUpdateModel.getAccuracy().setValue(accuracy);
        //deviceUpdateModel.getSpeedAccuracyms().setValue(speedAccuracyms);
        //deviceUpdateModel.getVerticalAccuracy().setValue(verticalAccuracy);
        return  deviceUpdateModel;
    }




    @Override
    public void onDestroy() {
        //timerTask.cancel();
        Log.d(STATUS, "Service destroyed...!");
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        locationManager.removeUpdates(locationListenerGPS);
    }


    @Override
    public void onCreateEntity(Response response) {
        //Toast.makeText(this, "Code Device: " + response.getHttpCode(), Toast.LENGTH_SHORT).show();
        if(response.getHttpCode() == 201){
            //Toast.makeText(this, "Entity Device created successfully", Toast.LENGTH_SHORT).show();
            Intent localIntent = new Intent(Constants.SERVICE_RUNNING_DEVICE).putExtra(Constants.SERVICE_RESULT_DEVICE, "Entity Device created successfully...!");
            LocalBroadcastManager.getInstance(ServiceDevice.this).sendBroadcast(localIntent);
            controllerSQLite.updateStatusActiveByKeywordTempCreate(device.getId());
            Log.i("ID device: ", device.getId());
        }else if(response.getHttpCode() == 422){
            //Toast.makeText(this, "The Device already exists....!", Toast.LENGTH_SHORT).show();
            Intent localIntent = new Intent(Constants.SERVICE_RUNNING_DEVICE).putExtra(Constants.SERVICE_RESULT_DEVICE, "The Device already exists....!");
            LocalBroadcastManager.getInstance(ServiceDevice.this).sendBroadcast(localIntent);
            controllerSQLite.updateStatusActiveByKeywordTempCreate(device.getId());
            Log.i("ID device: ", device.getId());
        }else{
            //Toast.makeText(this, "Error sending data...!", Toast.LENGTH_SHORT).show();
            Intent localIntent = new Intent(Constants.SERVICE_RUNNING_DEVICE).putExtra(Constants.SERVICE_RESULT_DEVICE, "Error sending data...!");
            LocalBroadcastManager.getInstance(ServiceDevice.this).sendBroadcast(localIntent);
        }
    }

    @Override
    public void onCreateEntitySaveOffline(Response response) {

    }

    @Override
    public void onUpdateEntity(Response response) {
        //Toast.makeText(this, "Code" + response.getHttpCode(), Toast.LENGTH_SHORT).show();
        if(response.getHttpCode()==204 || response.getHttpCode()==200){
            //Toast.makeText(this, "Successful Device Update...!", Toast.LENGTH_SHORT).show();
            Intent localIntent = new Intent(Constants.SERVICE_RUNNING_DEVICE).putExtra(Constants.SERVICE_RESULT_DEVICE, "Successful Device Update...!");
            LocalBroadcastManager.getInstance(ServiceDevice.this).sendBroadcast(localIntent);
        } else{
            //Toast.makeText(this, "Error updating...!"+response.getHttpCode(), Toast.LENGTH_SHORT).show();
            Intent localIntent = new Intent(Constants.SERVICE_RUNNING_DEVICE).putExtra(Constants.SERVICE_RESULT_DEVICE, "Error updating...!");
            LocalBroadcastManager.getInstance(ServiceDevice.this).sendBroadcast(localIntent);
        }
    }

    @Override
    public void onUpdateEntitySaveOffline(Response response) {

    }

    @Override
    public void onDeleteEntity(Response response) {

    }

    @Override
    public void onGetEntities(Response response) {

    }
}
