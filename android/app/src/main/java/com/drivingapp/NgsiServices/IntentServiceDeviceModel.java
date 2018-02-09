package com.drivingapp.NgsiServices;

import android.app.IntentService;
import android.content.Context;
import android.content.Intent;
import android.support.annotation.Nullable;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import www.fiware.org.ngsi.controller.ControllerSQLite;
import www.fiware.org.ngsi.controller.DeviceResources;
import www.fiware.org.ngsi.datamodel.entity.DeviceModel;
import www.fiware.org.ngsi.db.sqlite.SQLiteHelper;
import www.fiware.org.ngsi.httpmethodstransaction.Response;
import www.fiware.org.ngsi.utilities.Constants;
import www.fiware.org.ngsi.utilities.DevicePropertiesFunctions;
import www.fiware.org.ngsi.utilities.Functions;

/**
 * Created by Cipriano on 11/6/2017.
 */

public class IntentServiceDeviceModel extends IntentService implements DeviceResources.DeviceResourceMethods {
    private static final String STATUS = "Status";
    Context context;
    private DeviceResources deviceResources;
    private ControllerSQLite controllerSQLite;
    private DeviceModel deviceModel;
    private Functions functions;
    private DevicePropertiesFunctions deviceProperties;

    public IntentServiceDeviceModel(){
        super("IntentServiceDeviceModel");
        context = this;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        //Toast.makeText(getBaseContext(), "Service created device model...!", Toast.LENGTH_LONG).show();
        Log.d(STATUS, "Service created device model...!");
        functions = new Functions();
        controllerSQLite = new ControllerSQLite(context);
        deviceResources = new DeviceResources(this);
        deviceProperties = new DevicePropertiesFunctions();
    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        String actualDate = functions.getActualDate();
        //Obteniendo los datos para cargarlo en el DeviceModel
        deviceModel = new DeviceModel();
        deviceModel.setId("DeviceModel_"+functions.getReplaceParent(deviceProperties.getBrand())+"_"+functions.getReplaceParent(deviceProperties.getModel()));
        deviceModel.getCategory().setValue("smartphone");
        deviceModel.getBrandName().setValue(deviceProperties.getBrand());
        deviceModel.getModelName().setValue(functions.getReplaceParent(deviceProperties.getModel()));
        deviceModel.getManufacturerName().setValue(deviceProperties.getManufacturer());
        deviceModel.getDateCreated().setValue(actualDate);

        try {
            deviceResources.createEntity(context, deviceModel.getId(),deviceModel);
        } catch (Exception e) {
            Log.d(STATUS, "Exception DeviceModel...!"+deviceModel.toString());
            //Toast.makeText(getBaseContext(), "Exception DeviceModel...!", Toast.LENGTH_LONG).show();
        }
    }


    @Override
    public void onDestroy() {
        //timerTask.cancel();
        Log.d(STATUS, "Service destroyed...!");
        //Toast.makeText(getBaseContext(), "Service destroyed...!", Toast.LENGTH_LONG).show();


    }

    @Override
    public void onCreateEntity(Response response) {
        //Toast.makeText(this, "Code DeviceModel: " + response.getHttpCode(), Toast.LENGTH_SHORT).show();
        Log.i(STATUS, "Codigo: "+response.getHttpCode());
        SQLiteHelper sqlHelper = new SQLiteHelper(context);
        if(response.getHttpCode()==201){
            Intent localIntent = new Intent(Constants.SERVICE_RUNNING_DEVICEMODEL).putExtra(Constants.SERVICE_RESULT_DEVICEMODEL, "Entity DeviceModel created successfully...!");
            LocalBroadcastManager.getInstance(IntentServiceDeviceModel.this).sendBroadcast(localIntent);
            //Toast.makeText(this, "Entity DeviceModel created successfully", Toast.LENGTH_SHORT).show();
            sqlHelper.updateStatusActiveByKeywordTempCreate(deviceModel.getId());
        }else if(response.getHttpCode() == 422){
            Intent localIntent = new Intent(Constants.SERVICE_RUNNING_DEVICEMODEL).putExtra(Constants.SERVICE_RESULT_DEVICEMODEL, "The Device already exists....!");
            LocalBroadcastManager.getInstance(IntentServiceDeviceModel.this).sendBroadcast(localIntent);
            //Toast.makeText(this, "The Device already exists....!", Toast.LENGTH_SHORT).show();
            sqlHelper.updateStatusActiveByKeywordTempCreate(deviceModel.getId());
        }else{
            Intent localIntent = new Intent(Constants.SERVICE_RUNNING_DEVICEMODEL).putExtra(Constants.SERVICE_RESULT_DEVICEMODEL, "Error sending data...!");
            LocalBroadcastManager.getInstance(IntentServiceDeviceModel.this).sendBroadcast(localIntent);
            //Toast.makeText(this, "Error sending data...!", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onCreateEntitySaveOffline(Response response) {

    }

    @Override
    public void onUpdateEntity(Response response) {

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
