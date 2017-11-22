package com.drivingapp.NgsiServices;

import android.app.IntentService;
import android.content.Context;
import android.content.Intent;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.support.annotation.Nullable;
import android.util.Log;

/**
 * Created by Cipriano on 11/6/2017.
 */

public class IntentServiceSensors extends IntentService {
    private static final String STATUS = "Status";
    private double ax, ay, az, gx, gy, gz;
    private SensorManager mSensorManager;
    private Sensor mAccelerometer;
    private Sensor mGyroscope;
    Context context;
    public IntentServiceSensors(){
        super("IntentServiceSensors");
    }

    @Override
    public void onCreate() {
        super.onCreate();
        context = this;
        Log.d(STATUS, "Service created...!");
    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        mAccelerometer = mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        mGyroscope = mSensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);
        mSensorManager.registerListener(sensors, mAccelerometer, SensorManager.SENSOR_DELAY_NORMAL);
        mSensorManager.registerListener(sensors, mGyroscope, SensorManager.SENSOR_DELAY_NORMAL);

    }


    @Override
    public void onDestroy() {
        //timerTask.cancel();
        Log.d(STATUS, "Service destroyed...!");
        mSensorManager.unregisterListener(sensors);
    }

    private final SensorEventListener sensors = new SensorEventListener() {
        @Override
        public void onSensorChanged(SensorEvent sensorEvent) {
            synchronized(this) {
                long current_time = sensorEvent.timestamp;
                if (sensorEvent.sensor.getType()==Sensor.TYPE_ACCELEROMETER){
                    ax = sensorEvent.values[0];
                    ay = sensorEvent.values[1];
                    az = sensorEvent.values[2];
                    Log.i("ACCELEROMETER", "AX "+ax+" AY "+ay+" AZ "+az +" time: "+current_time);
                }else if(sensorEvent.sensor.getType()==Sensor.TYPE_GYROSCOPE){
                    gx = sensorEvent.values[0];
                    gy = sensorEvent.values[1];
                    gz = sensorEvent.values[2];
                    Log.i("GYROSCOPE", "AX "+gx+" AY "+gy+" AZ "+gz+" time: "+current_time);
                }
            }
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int i) {

        }
    };

}
