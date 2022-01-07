class MyMenuManager extends MenuManager {

    constructor(id, notificationCenter, keyboardManager, ) {

        super(id);

        this.notificationCenter = notificationCenter;
        this.keyboardManager = keyboardManager;

        this.initialize();

        // Register this object for notifications
        this.registerForNotifications();
    }

    registerForNotifications() {

        // When a 'menu' event fires, call the 'handleMenuNotification' function of 'this' object
        this.notificationCenter.register(
            NotificationType.Menu,
            this,
            this.handleMenuNotification
        );
    }

    handleMenuNotification(notification) {

        switch (notification.notificationAction) {

            case NotificationAction.ShowMenuChanged:

                this.showMenu(notification.notificationArguments[0]);
                break;

            default:
                break;
        }
    }

    showMenu(statusType) {

        // Check out the initialize function of this class. In it, we create a 'Menu' notification
        // whenever the play button is pressed. This notification has an action of ShowMenuChanged,
        // and an argument of [StatusType.Updated | StatusType.Drawn]. The handleMenuNotification 
        // function of this class is registered to the 'Menu' event. So, it will be called whenever
        // a 'Menu' notification is created. In the handleMenuNotification, we call this showMenu
        // function if the notification's action is of type 'ShowMenuChanged'. We also pass through 
        // the parameters that were added to the notification - [StatusType.Updated | StatusType.Drawn] 
        // in our case.

        // So, the statusType that is passed to this function will ultimately be [StatusType.Updated |
        // StatusType.Drawn] (or simply '3', if we work it out). 

        // This means, that when the user presses the 'play' button, a ShowMenuChanged notification is
        // created, which ultimately tells this function to hide the menu. On the other hand, we could
        // tell this notification to show the menu, by creating another ShowMenuChanged notification, but
        // by passing through a StatusType of off.

        // The reason why we use [StatusType.Drawn | StatusType.Updated] to turn off the menu, and 
        // [StatusType.Off] to turn on the menu, is because the same notification is sent to the
        // object manager, which ultimately tells it to start Updating and Drawing if the menu is
        // turned off, or to stop Updating and Drawing if the menu is turned on. Here we see how
        // one notification may be used to control multiple separate elements.

        // If we created an event to tell the ObjectManager to draw and update,
        // then it means we want the game to run i.e. hide the menu
        if (statusType != 0) {

            $('#main_menu').hide();
        } else {

            $('#main_menu').show();
        }
    }

    initialize() {

        // Hide the exit menu
        $('#exit_menu').hide();
        $('#exit_menu').addClass('hidden');

        // Hide Normal Mode Description
        $('#normal_mode_menu').hide();
        $('#normal_mode_menu').addClass('hidden');

        // Hide Power Up Mode Description
        $('#power_up_mode_menu').hide();
        $('#power_up_mode_menu').addClass('hidden');

        // Hide Menu after death
        $('#death_menu').hide();
        $('#death_menu').addClass('hidden');

        // If the play button for Normal Mode is clicked
        $('.normal').click(function() {

            $('#main_menu').hide();

            $('#normal_mode_menu').show();
            $('#normal_mode_menu').removeClass('hidden');

        });

        // If play button for Normal Mode in Description Menu is clicked
        $('.play_normal').click(function() {

            $('#normal_mode_menu').hide();

            // Send a notification to update and draw the game
            notificationCenter.notify(
                new Notification(
                    NotificationType.Menu,
                    NotificationAction.ShowMenuChanged, [StatusType.Updated | StatusType.Drawn]
                )
            );
        });

        // If back button for Normal Mode in Description Menu is clicked
        $('.back_normal').click(function() {
            $('#normal_mode_menu').hide();
            $('#main_menu').show();
        })

        // If the play button for Power Up Mode is clicked
        $('.power_up').click(function() {

            // Hide the menu
            $('#main_menu').hide();

            $('#power_up_mode_menu').show();
            $('#power_up_mode_menu').removeClass('hidden');
        });

        // If play button for Power Up Mode in Description Menu is clicked
        $('.play_power_up').click(function() {

            $('#power_up_mode_menu').hide();

            BoardData.POWER_UP_MODE = true;

            notificationCenter.notify(
                new Notification(
                    NotificationType.Menu,
                    NotificationAction.ShowMenuChanged, [StatusType.Updated | StatusType.Drawn]
                )
            );
        });

        // If back button for Power Up Mode in Description Menu is clicked
        $('.back_power_up').click(function() {
            $('#power_up_mode_menu').hide();
            $('#main_menu').show();
        });

        // If the exit button is clicked
        $('.exit').click(function() {
            $('#exit_menu').show();
            $('#exit_menu').removeClass('hidden');
        });

        // If Play Again button is clicked after death
        $('.play_again').click(function() {
            resetGame();
            $('#main_menu').hide();

            notificationCenter.notify(
                new Notification(
                    NotificationType.Menu,
                    NotificationAction.ShowMenuChanged, [StatusType.Updated | StatusType.Drawn]
                )
            );
        });

        // If Back button is clicked after death
        $('.back_from_death').click(function() {
            resetGame();
        });
    }

    /**
     * Triggers the death menu and insert amount of food eaten and lengt of snake into HTML elements
     * @param {Number} length 
     * @param {Number} food 
     */
    death(length, food) {
        $('#death_menu').show();
        $('#death_menu').removeClass('hidden');
        document.getElementById("amount_food").innerHTML = food;
        document.getElementById("length_snake").innerHTML = length;

        this.notificationCenter.deregister()
    }
}