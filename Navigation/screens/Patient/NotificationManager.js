import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import {platfrom} from 'react-native'


class NotificationManager
{
    configure = () =>
    {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
              console.log("OnRegister TOKEN:", token);
            },
            onNotification: function(notification) {
                console.log("onNOTIFICATION:", notification);
            
                // process the notification
            
                // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
        })
    }

    _buildAndroidNotification = (id,title,message)
}