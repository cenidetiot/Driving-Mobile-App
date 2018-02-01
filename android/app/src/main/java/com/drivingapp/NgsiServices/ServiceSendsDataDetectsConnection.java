package com.drivingapp.NgsiServices;

import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;
import android.support.v4.app.NotificationCompat;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.TimerTask;

import www.fiware.org.ngsi.controller.ControllerSQLite;
import www.fiware.org.ngsi.controller.DeviceResources;
import www.fiware.org.ngsi.db.sqlite.entity.Tbl_Data_Temp;
import www.fiware.org.ngsi.httpmethodstransaction.Response;
import www.fiware.org.ngsi.utilities.ApplicationPreferences;
import www.fiware.org.ngsi.utilities.Constants;
import www.fiware.org.ngsi.utilities.DevicePropertiesFunctions;

import static www.fiware.org.ngsi.utilities.Constants.PREFERENCE_MOBILE_DATA_KEY;
import static www.fiware.org.ngsi.utilities.Constants.PREFERENCE_OFFLINE_MODE_KEY;
import static www.fiware.org.ngsi.utilities.Constants.PREFERENCE_STATUS_MOBILE_DATA;
import static www.fiware.org.ngsi.utilities.Constants.PREFERENCE_STATUS_OFFLINE_MODE;

/**
 * Created by Cipriano on 10/21/2017.
 */

public class ServiceSendsDataDetectsConnection extends Service implements DeviceResources.DeviceResourceMethods {
    private static final String STATUS = "Status";
    TimerTask timerTask;
    private ApplicationPreferences appPreferences;
    private DevicePropertiesFunctions functions;
    private ControllerSQLite controllerSQLite;
    Tbl_Data_Temp tblDataTemp;
    Context context;
    private ArrayList<Tbl_Data_Temp> getListInactive, getListInactiveTempCreate;
    private DeviceResources deviceResources;
    private String auxId = "", auxKeyword = "";
    private int count = 1;

    public ServiceSendsDataDetectsConnection(){
        appPreferences = new ApplicationPreferences();
        functions = new DevicePropertiesFunctions();
        context = this;
        controllerSQLite = new ControllerSQLite(context);
        deviceResources = new DeviceResources(this);
        tblDataTemp = new Tbl_Data_Temp();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        Log.d(STATUS, "Service created...!");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(STATUS, "Service started...!");
        NotificationManager notificationManager =(NotificationManager) getApplicationContext().getSystemService(NOTIFICATION_SERVICE);
        // Se construye la notificación
        //Deprecate a partir de la API 26
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this)
                .setSmallIcon(android.R.drawable.stat_sys_upload_done)
                .setContentTitle("Backing information")
                .setColor(200)
                .setAutoCancel(true)
                .setContentText("Processing...");

        if (appPreferences.getValuePreferenceBoolean(context, PREFERENCE_OFFLINE_MODE_KEY, PREFERENCE_STATUS_OFFLINE_MODE) == true) {
            Log.d("Status deviceModel", "MODE OFFLINE!");
            Intent localIntent = new Intent(Constants.SERVICE_RUNNING_MODE_OFFLINE).putExtra(Constants.SERVICE_RESULT_MODE_OFFLINE, "ACTIVE MODE OFFLINE...!");
            LocalBroadcastManager.getInstance(ServiceSendsDataDetectsConnection.this).sendBroadcast(localIntent);
        }else{
            if(appPreferences.getValuePreferenceBoolean(context, PREFERENCE_MOBILE_DATA_KEY, PREFERENCE_STATUS_MOBILE_DATA) == true){
                if(functions.isNetworkType(context) == "WIFI" || functions.isNetworkType(context) == "MOBILE"){
                    Log.d(STATUS, "WIFI or MOBILE...!");
                    getListInactiveTempCreate = controllerSQLite.getAllByStatusInactiveTempCreate();
                    if (!getListInactiveTempCreate.isEmpty()){
                        for (int i = 0; i < getListInactiveTempCreate.size(); i++) {
                            try {
                                auxKeyword = getListInactiveTempCreate.get(i).getKeyword();
                                auxId = getListInactiveTempCreate.get(i).getId().toString();
                                deviceResources.createEntitySaveOffline(auxId, getListInactiveTempCreate.get(i).getKeyword(), getListInactiveTempCreate.get(i).getJson());
                            } catch (Exception e) {
                                Log.i("Status", "Exception Device Create...!");
                            }
                        }

                    }
                    //Envía los datos al CB para actualizarlos
                    getListInactive = controllerSQLite.getAllStatusInactiveTempUpdate();
                    if(!getListInactive.isEmpty()) {
                        for (int i = 0; i < getListInactive.size(); i++) {
                            try {
                                //mostrar la notificación del Backing
                                builder.setSubText("Id: "+getListInactive.get(i).getId());
                                builder.setProgress(getListInactive.size(), count, false);
                                notificationManager.notify(1, builder.build());
                                count ++;
                                auxId = getListInactive.get(i).getId().toString();
                                deviceResources.updateEntitySaveOffline(auxId, getListInactive.get(i).getKeyword(), getListInactive.get(i).getJson());
                            } catch (Exception e) {
                                Log.i("Status", "Exception Device Update...!");
                            }
                        }
                    }else{
                        Intent localIntent = new Intent(Constants.SERVICE_RUNNING_BACKING_UP).putExtra(Constants.SERVICE_RESULT_BACKING_UP, "NO DATA TO BACK UP...!");
                        LocalBroadcastManager.getInstance(ServiceSendsDataDetectsConnection.this).sendBroadcast(localIntent);
                    }
                }else{
                    Log.d(STATUS, "DISCONNECTED...!");
                    Intent localIntent = new Intent(Constants.SERVICE_RUNNING_MODE_OFFLINE).putExtra(Constants.SERVICE_RESULT_MODE_OFFLINE, "DISCONNECTED DEVICE...!");
                    LocalBroadcastManager.getInstance(ServiceSendsDataDetectsConnection.this).sendBroadcast(localIntent);
                }
            }else{
                if(functions.isNetworkType(context) == "WIFI"){
                    Log.d(STATUS, "WIFI...!");
                    getListInactiveTempCreate = controllerSQLite.getAllByStatusInactiveTempCreate();
                    if (!getListInactiveTempCreate.isEmpty()){
                        for (int i = 0; i < getListInactiveTempCreate.size(); i++) {
                            try {
                                auxId = getListInactiveTempCreate.get(i).getId().toString();
                                deviceResources.createEntitySaveOffline(auxId, getListInactiveTempCreate.get(i).getKeyword(), getListInactiveTempCreate.get(i).getJson());
                            } catch (Exception e) {
                                Log.i("Status", "Exception Device Create...!");
                            }
                        }
                    }
                    //Envía los datos al CB para actualizarlos
                    getListInactive = controllerSQLite.getAllStatusInactiveTempUpdate();
                    if(!getListInactive.isEmpty()) {
                        for (int i = 0; i < getListInactive.size(); i++) {
                            try {
                                //mostrar la notificación del Backing
                                builder.setSubText("Id: "+getListInactive.get(i).getId());
                                builder.setProgress(getListInactive.size(), count, false);
                                notificationManager.notify(1, builder.build());
                                count ++;
                                auxId = getListInactive.get(i).getId().toString();
                                deviceResources.updateEntitySaveOffline(auxId, getListInactive.get(i).getKeyword(), getListInactive.get(i).getJson());
                            } catch (Exception e) {
                                Log.i("Status", "Exception Device Update...!");
                            }
                        }
                    }else{
                        Intent localIntent = new Intent(Constants.SERVICE_RUNNING_BACKING_UP).putExtra(Constants.SERVICE_RESULT_BACKING_UP, "NO DATA TO BACK UP...!");
                        LocalBroadcastManager.getInstance(ServiceSendsDataDetectsConnection.this).sendBroadcast(localIntent);
                    }
                }else{
                    Log.d(STATUS, "DISCONNECTED...!");
                    Intent localIntent = new Intent(Constants.SERVICE_RUNNING_MODE_OFFLINE).putExtra(Constants.SERVICE_RESULT_MODE_OFFLINE, "DISCONNECTED DEVICE...!");
                    LocalBroadcastManager.getInstance(ServiceSendsDataDetectsConnection.this).sendBroadcast(localIntent);
                }
            }
        }

        return START_NOT_STICKY;
    }

    @Override
    public void onDestroy() {
        //timerTask.cancel();
        Log.d(STATUS, "Servicio destruido...");
    }


    @Override
    public void onCreateEntity(Response response) {

    }

    @Override
    public void onCreateEntitySaveOffline(Response response) {
        if(response.getHttpCode() == 201){
            //Toast.makeText(this, "Entity created successfully", Toast.LENGTH_SHORT).show();
            controllerSQLite.updateStatusActiveByKeywordTempCreate(response.getIdDB());
            Log.i("ID Entity: ", response.getIdDB());
        }else if(response.getHttpCode() == 422){
            //Toast.makeText(this, "The entity already exists....!", Toast.LENGTH_SHORT).show();
            controllerSQLite.updateStatusActiveByKeywordTempCreate(response.getIdDB());
            Log.i("ID Entity: ", response.getIdDB());
        }else{
            //Toast.makeText(this, "Error sending data...!", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onUpdateEntity(Response response) {

    }

    @Override
    public void onUpdateEntitySaveOffline(Response response) {
        Log.i("Code: ", ""+response.getHttpCode());
        if(response.getHttpCode()==204 || response.getHttpCode()==200){
            tblDataTemp.setId(Integer.parseInt(response.getIdDB()));
            //Modifica el status a 1 para indicar que el registro ya fue enviado al Context Broker.
            controllerSQLite.updateStatusActiveByIdTempUpdate(tblDataTemp);
            Intent localIntent = new Intent(Constants.SERVICE_RUNNING_BACKING_UP).putExtra(Constants.SERVICE_RESULT_BACKING_UP, "Backing up: "+response.getIdDB());
            LocalBroadcastManager.getInstance(ServiceSendsDataDetectsConnection.this).sendBroadcast(localIntent);
            //Eliminar de la tabla registros con status 1.
            //sqLiteHelper.deleteByStatusActiveTempUpdate();
            Log.i("Status + id"+response.getIdDB(), "Successful Device Update...!");
        } else{
            Log.i("Status", "Error updating...!");
        }
    }


    @Override
    public void onDeleteEntity(Response response) {

    }

    @Override
    public void onGetEntities(Response response) {

    }
}
