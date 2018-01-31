package com.drivingapp;

import android.app.Application;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.ContextThemeWrapper;
import android.view.LayoutInflater;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
//import io.realm.react.RealmReactPackage;
import com.mapbox.reactnativemapboxgl.ReactNativeMapboxGLPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.google.firebase.iid.FirebaseInstanceId;

import java.util.Arrays;
import java.util.List;


import www.fiware.org.ngsi.utilities.Tools;

public class MainApplication extends Application implements ReactApplication {
  LocationManager locationManager;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new ReactNativeMapboxGLPackage(),
            new NgsiPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    Context context = getApplicationContext();

    Intent serviceIntent = new Intent(context, FCMToken.class);
    serviceIntent.putExtra("FCMToken", FirebaseInstanceId.getInstance().getToken());
    context.startService(serviceIntent);
    HeadlessJsTaskService.acquireWakeLockNow(context);

    try {
          Tools.initialize("config.properties", getApplicationContext());
    } catch (Exception e) {
        e.printStackTrace();
    }

    locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);

    if (!locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)){
      Log.i("Status", "No Activo GPS");
     // showGPSDisabledAlert();
    }else{
      Log.i("Status", "Activo GPS");
    }
  }

 /* private void showGPSDisabledAlert(){
    AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
    alertDialogBuilder.setMessage("GPS is disabled on the device. Do you want to enable?")
            .setCancelable(false)
            .setPositiveButton("Enable GPS",
                    new DialogInterface.OnClickListener(){
                      public void onClick(DialogInterface dialog, int id){
                        Intent callGPSSettingIntent = new Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS);
                        startActivity(callGPSSettingIntent);
                      }
                    });
    AlertDialog alert = alertDialogBuilder.create();
    alert.show();
  }*/
}
