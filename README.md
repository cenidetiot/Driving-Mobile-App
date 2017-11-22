Bienvenido a Driving Mobile App!
===================


Hola! Esta aplicación está desarrollada con [React Native](https://facebook.github.io/react-native/).  Es importante mencionar que  esta aplicación utiliza componentes nativos de **Android** por lo tanto **no es posible utilizarla** con [Expo](https://expo.io/) o Create-react-native-app. 


----------


Primeros pasos
-------------


> **Requerimientos:**

> - [NodeJS](https://facebook.github.io/react-native/).
> - [npm](https://facebook.github.io/react-native/)
> - [Java Development Kit](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
> - [Android development environment](https://developer.android.com/studio/index.html)
> - [react-native-cli](https://facebook.github.io/react-native/docs/getting-started.html)

> Para una guía completa sobre como instalar [react-native-cli](https://facebook.github.io/react-native/docs/getting-started.html) y configurar tu [Android development environment](https://developer.android.com/studio/index.html) lo puedes encontrar en el siguiente enlace [React-Native Getting started](https://facebook.github.io/react-native/docs/getting-started.html).

Ademas es necesario instalar las dependencias del proyecto esto se puede realizar con el comando ***npm install*** o ***yarn add***. 

#### <i class="icon-hdd"></i> Crear Aplicación Debug 

Considerando que ya se encuentran tu [Android development environment](https://developer.android.com/studio/index.html) configurado correctamente, para <i class="icon-hdd"></i> **Crear Aplicación Debug**  únicamente es necesario entrar en la carpeta ***/android***  y utilizar el comando ***./gradlew assembleDebug***.

La direción donde se generará la aplicción Debug es : /android/app/build/outputs/apk/app-debug.apk

También puedes descargarla desde este enlace [AppDebug](https://github.com/danieltoo/Smart-Notifications-RN/blob/master/android/app/build/outputs/apk/app-debug.apk), esta aplicación se encuentra suscrita a una dirección IP por defecto para cambiarla es necesario editarla y compilar la aplicación.

Cabe mencionar que para trabajar de esta forma es necesario utilizar el comando ***adb reverse tcp:8081 tcp:8081*** y posteriormente ***[yarn](https://yarnpkg.com/lang/en/) run start*** o en su defecto ***react-native start***

#### <i class="icon-hdd"></i> Crear Aplicación Release

Para utilizar esta forma es necesario firmar tu aplicación puedes encontrar la guía de como realizar esto en el siguiente enlace [Generate signed APK](https://facebook.github.io/react-native/docs/signed-apk-android.html).

De una forma muy parecida que al crear la aplicación Debug para <i class="icon-hdd"></i> **Crear Aplicación Release**  dentro de la carpeta ***/android***  se debe utilizar el comando ***./gradlew assembleRelease***.

La dirección donde se generará la aplicación Release es : /android/app/build/outputs/apk/app-release.apk

También puedes descargarla desde este enlace [AppRelease](https://github.com/danieltoo/Smart-Notifications-RN/blob/master/android/app/build/outputs/apk/app-debug.apk), esta aplicación se encuentra suscrita a una dirección IP por defecto para cambiarla es necesario editarla y compilar la aplicación.



#### <i class="icon-file"></i> Utilizar Android Studio  

Para realizar esto es necesario abrir el proyecto con [Android Studio](https://developer.android.com/studio/index.html?hl=es-419) y generar la apk que requieras, la localización de cada apk generada será la misma que se mencionó antes.

Modificar conexiones Orion Contextbroker y Servidor de Aplicación
-------------------

Es necesario modificar la ip que se encuentra en los archivos **utils/OCBConfig.js** y **utils/config.js** a la ip de tu Orion Contextbroker y tu servidor de aplicación respectivamente.

```js
//OCBConfig.js
export default {
	
	ip : 'YOUR_IP_OCB',
	port: 1026,
	version : 'v2'


}
```


```js
//config.js
export default {
	
	ip : 'YOUR_IP_SERVER',
	port: 3001


}
```




Aplicación servidor 
-------------------

Puedes ver el código ejemplo de las aplicaciones servidor en **Javascript con NodeJs** en el siguiente repositorio [Smart-Notifications-SERVER](https://github.com/danieltoo/Smart-Notifications-SERVER).





 
