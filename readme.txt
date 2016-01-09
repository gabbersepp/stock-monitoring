https://www.raspberrypi.org/forums/viewtopic.php?f=41&t=924&start=25

Hello @ll Raspberry Pi and Digital Signage friends, here
comes my description, like I promised it today morning.

Here is again the link to the YouTube Video of my Pi Digital Signage State:
http://www.youtube.com/watch?v=vaPt_3aN-CU

HOW TO Bring RaspberryPi to an digital signage client

1.) Download Raspberry Debian (Raspbian) distribution and install on SD card
(find infos here: http://www.raspberrypi.org/downloads)

2.) Setup following things in Raspi-config

    -> Set 'boot_behaviour' straight to desktop

    -> Additional i expanded the root file system, configured keyboard,
    changed the timezone, the locale settings and password. SSH enabled.


3.) Then I hosted a website in the internet
The site(s) I created like already sayed with iWeb the webpage creation tool from Apple.
As automatic page switching I implemented on every page a java script function
to switch after a certain time to the next page and from the last page again to the first.

The Java Script code:

    <script type="text/javascript">
    var redirectURL ='http://www.example.com/page2'; // edit this value for the next page
    var redirectDelayInSeconds = 15; // edit this value after how many seconds
    var d = redirectDelayInSeconds * 1000;
    window.setTimeout ('parent.location.replace(redirectURL)', d);
    </script>



Alternative you can put the website also on the pi or host it on an webserver on the pi.
But I prefer for my customers of that solution the external hosting, because then you
can easily change the configuration on one server and it is deployed to all connected
pi's.

4.) Then I setup the LXDE X Window to automatic start the web browser midori with your web page.

    sudo nano ~/.config/lxsession/LXDE/autostart

    @midori -e Fullscreen -a http://www.example.com



5.) Now we have to only switch of the automatic screen blanking.
The raspbian image blanks after 15 minutes the screen, this I wanted to
avoid.

    sudo nano /etc/lightdm/lightdm.conf

Enable in the category 'SeatDefaults' the xserver-command like following:

    [SeatDefaults]
    xserver-command=X -s 0 dpms



Now you can reboot your raspberry and the berry shows your website and
iterates to all the pages how you designed them.