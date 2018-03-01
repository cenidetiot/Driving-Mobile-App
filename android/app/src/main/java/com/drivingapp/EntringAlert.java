package com.drivingapp;
import android.content.Intent;
import android.os.Bundle;
import android.content.Context;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class EntringAlert extends HeadlessJsTaskService {

  @Override
  protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
      Bundle extras = intent.getExtras();

	 	WritableMap data = extras != null ? Arguments.fromBundle(extras) : null;
    	return new HeadlessJsTaskConfig(
            "EntringAlert",
            data,
            3000, 
            true);
    
  }
  
}