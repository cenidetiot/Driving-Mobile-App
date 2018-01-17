package com.drivingapp;

import android.app.Application;
import android.content.Context;
import android.content.Intent; 
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.ReactApplication;
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

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
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
  }
}
