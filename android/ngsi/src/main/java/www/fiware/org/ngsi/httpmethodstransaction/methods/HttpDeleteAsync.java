package www.fiware.org.ngsi.httpmethodstransaction.methods;

import android.os.AsyncTask;
import android.util.Log;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

import www.fiware.org.ngsi.httpmethodstransaction.Response;


/**
 * Created by Cipriano on 9/6/2017.
 */

public class HttpDeleteAsync extends AsyncTask<String, String, Response> {
    String host = System.getProperty("http.host");
    String version = System.getProperty("http.apiversion");
    String attrs = System.getProperty("http.attrs");
    String connectionTimeout = System.getProperty("http.connectiontimeout");
    String readTimeout = System.getProperty("http.readtimeout");
    String uri = System.getProperty("http.entities");

    ExecRequestDelete execRequest;
    Response response = null;

    public HttpDeleteAsync(ExecRequestDelete execRequest){
        this.execRequest = execRequest;
    }
    public interface ExecRequestDelete {
        void executeRequest(Response response);
    }

    @Override
    protected Response doInBackground(String... queryString) {
        HttpURLConnection connection = null;
        response = new Response();
        URL url = null;
        InputStream stream = null;
        String result = null;
        try {
            url = new URL("http://207.249.127.174:1026/v2/entities/F4:F5:24:82:CD:24");
        } catch (MalformedURLException exception) {
            exception.printStackTrace();
        }
        try {
            //URL url = new URL(host + "/" + version + queryString[0]+ "/"+ queryString[1]);
           // URL url = new URL("http://207.249.127.174:1026/v2/entities/F4:F5:24:82:CD:24");

            connection = (HttpsURLConnection) url.openConnection();
            // Timeout for reading InputStream arbitrarily set to 3000ms.
            connection.setReadTimeout(3000);
            // Timeout for connection.connect() arbitrarily set to 3000ms.
            connection.setConnectTimeout(3000);
            // For this use case, set HTTP method to GET.
            connection.setRequestMethod("GET");
            // Already true by default but setting just in case; needs to be true since this request
            // is carrying an input (response) body.
            connection.setDoInput(true);
            // Open communications link (network traffic occurs here).
            connection.connect();
            //publishProgress(DownloadCallback.Progress.CONNECT_SUCCESS);
            int responseCode = connection.getResponseCode();
            if (responseCode != HttpsURLConnection.HTTP_OK) {
                throw new IOException("HTTP error code: " + responseCode);
            }
            // Retrieve the response body as an InputStream.
            stream = connection.getInputStream();
            //publishProgress(DownloadCallback.Progress.GET_INPUT_STREAM_SUCCESS, 0);
            if (stream != null) {
                // Converts Stream to String with max length of 500.
                result = readStream(stream, 500);
            }
            Log.i("REsult: ", ""+result);
            response.setHttpCode(connection.getResponseCode());

        }catch (IOException e){
            e.printStackTrace();
        }finally {
            if(connection != null)
                connection.disconnect();
        }
        return response;
    }

    public String readStream(InputStream stream, int maxReadSize)
            throws IOException, UnsupportedEncodingException {
        Reader reader = null;
        reader = new InputStreamReader(stream, "UTF-8");
        char[] rawBuffer = new char[maxReadSize];
        int readSize;
        StringBuffer buffer = new StringBuffer();
        while (((readSize = reader.read(rawBuffer)) != -1) && maxReadSize > 0) {
            if (readSize > maxReadSize) {
                readSize = maxReadSize;
            }
            buffer.append(rawBuffer, 0, readSize);
            maxReadSize -= readSize;
        }
        return buffer.toString();
    }

    @Override
    public void onPostExecute(Response response) {
        this.execRequest.executeRequest(response);
    }
}
