package www.fiware.org.ngsi.utilities;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * Created by Cipriano on 10/19/2017.
 */

public class ApplicationPreferences {

    public ApplicationPreferences (){

    }

    public void saveValuePreferenceBoolean(Context context, boolean valor, String preferenceKey, String preferenceName) {
        SharedPreferences settings = context.getSharedPreferences(preferenceKey, context.MODE_PRIVATE);
        SharedPreferences.Editor editor;
        editor = settings.edit();
        editor.putBoolean(preferenceName, valor);
        editor.commit();
    }



    public boolean getValuePreferenceBoolean(Context context, String preferenceKey, String preferenceName) {
        SharedPreferences preferences = context.getSharedPreferences(preferenceKey, context.MODE_PRIVATE);
        return  preferences.getBoolean(preferenceName, false);
    }

    public boolean getValuePreferenceBooleanTrue(Context context, String preferenceKey, String preferenceName) {
        SharedPreferences preferences = context.getSharedPreferences(preferenceKey, context.MODE_PRIVATE);
        return  preferences.getBoolean(preferenceName, true);
    }
}
