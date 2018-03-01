
package com.drivingapp;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.support.v4.app.NotificationCompat;
import android.util.Log;
import android.graphics.Color;
import android.graphics.Bitmap;
import com.drivingapp.R;


import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.facebook.react.HeadlessJsTaskService;

public class DrivingFirebaseMessagingService extends FirebaseMessagingService {

    private static final String TAG = "Alertas";

    /**
     * Called when message is received.
     *
     * @param remoteMessage Object representing the message received from Firebase Cloud Messaging.
     */

    // [START receive_message]

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d(TAG, "From: " + remoteMessage.getFrom());
        // Check if message contains a data payload.
        if (remoteMessage.getData().size() > 0) {
            Log.d(TAG, "Message data payload: " + remoteMessage.getData());
        }
        // Check if message contains a notification payload.
        if (remoteMessage.getNotification() != null) {
            Log.d(TAG, "Message Notification Body: " + remoteMessage.getNotification().getBody());
            showNotification(remoteMessage.getNotification().getTitle(),remoteMessage.getNotification().getBody());	
            newAlertMessage(remoteMessage.getNotification().getTitle());
        }
    }

    private void showNotification(String messageTitle ,String messageBody) {

        Intent intent = new Intent(this, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0 /* Request code */, intent,
                PendingIntent.FLAG_ONE_SHOT);
        Uri defaultSoundUri= RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        NotificationCompat.Builder notificationBuilder =
                new NotificationCompat.Builder(this)
                .setContentTitle(messageTitle)
                .setContentText(messageBody)
                .setAutoCancel(true) 
                .setColorized(true)
                .setColor(Color.RED)
                .setSmallIcon(R.drawable.warning)
                .setVibrate(new long[] {100, 250, 100, 500})
                .setSound(defaultSoundUri)
                .setContentIntent(pendingIntent);
        NotificationManager notificationManager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(0 /* ID of notification */, notificationBuilder.build());
    }

    private void newAlertMessage(String messageTitle) {

        Context context = getApplicationContext();
        Intent serviceIntent = new Intent(context, EntringAlert.class);
        serviceIntent.putExtra("EntringAlert", messageTitle);
        context.startService(serviceIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);

    }

    // [END receive_message]

}