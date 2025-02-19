
<?php
    error_reporting(E_ALL ^ E_DEPRECATED);
    
    /*
     * Example that changes html of phpcas messages
     *
     * PHP Version 7
     *
     * @file     example_html.php
     * @category Authentication
     * @package  PhpCAS
     * @author   Joachim Fritschi <jfritschi@freenet.de>
     * @author   Adam Franco <afranco@middlebury.edu>
     * @license  http://www.apache.org/licenses/LICENSE-2.0  Apache License 2.0
     * @link     https://wiki.jasig.org/display/CASC/phpCAS
     */
      /*
    // Load the settings from the central config file
    require_once 'model/config.php';
    // Load the CAS lib
    require_once $phpcas_path . '/CAS.php';
    
    // Initialize phpCAS
    phpCAS::client(CAS_VERSION_3_0,'cas.ust.hk',443,'cas');
    
    // For production use set the CA certificate that is the issuer of the cert
    // on the CAS server and uncomment the line below
    phpCAS::setCasServerCACert('model/cachain.pem');
    
    // For quick testing you can disable SSL validation of the CAS server.
    // THIS SETTING IS NOT RECOMMENDED FOR PRODUCTION.
    // VALIDATING THE CAS SERVER IS CRUCIAL TO THE SECURITY OF THE CAS PROTOCOL!
    phpCAS::setNoCasServerValidation();
    
    // force CAS authentication
    phpCAS::forceAuthentication();
    
    // at this step, the user has been authenticated by the CAS server
    // and the user's login name can be read with phpCAS::getUser().
    
    // logout if desired
    if (isset($_REQUEST['logout'])) {
        phpCAS::logout();
    }
    
     
       /*
    $uid=phpCAS::getUser();
    $userInfo = phpCAS::getAttributes();
    $fullName = $userInfo['name']; 
    */  
    $currentCohort = 'Spring25';

    $uid="T02";
    $fullName = "Test2";   
    
?>

<!DOCTYPE html>
<html>
    <head>
        <Title>The Hidden Tuck Shop by Moriarty Academy</Title>
        <link href="css/style.css" rel="stylesheet" type="text/css" />
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
        <script src="https://kit.fontawesome.com/4171695087.js" crossorigin="anonymous"></script>
        <style>
            
            .shopButton{
                background-color: black;
                color: white;
                border:0px;
                border-radius: 0.5em;
            }

            .FAQ-topic{
                margin-top:3em;
                font-weight: bold;
                text-decoration: underline;
            }
            .FAQ-q{
                margin-top:3em;
                font-weight: bold;
            }
            .FAQ-a{
                margin-bottom:3em;
            }           
            
            /* shopping Card effect */
            .flex-container > div {
                width: 18vw;
                height: 100%;
                margin: 2em;
            }
            .overlayBox {
                height: 80%;
                position: relative;
            }
            .overlayBox img {
                display: block;
                width: 100%;
                height: 100%;
            }
            .overlayCard{
                position:absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                height: 100%;
                width: 100%;
                opacity: 0;
                transition: .5s ease;
                text-align:Center;
            }
            .overlayBox:hover .hoverCard {
                opacity: 1;
                cursor:pointer;
            }
            .overlayCard div, .overlayCard p{
                position:absolute;
                width:100%;
                left:0;
                margin:0 0 0 0;
            }
            .overlayCard p{
                background-color:#897CB0;
                bottom: 1.5em;
                padding-bottom:1em;
                padding-top:1em;
                font-size: 1.5em;
                color:white;
            }
            .overlayCard div{
                background-color:black;
                top: 0;
                height: 100%;
                opacity: 0.3;
            }
            .usedCard {
                opacity: 1;
            }
            .usedCard p{
                opacity: 0.6;
                /*bottom: 40%;*/
            }
            .overlayCard div{
                opacity: 0.2;
            }
            /* shopping Card effect */

            /* fade in/out effect */
            .fade-box {
                position: relative;
                height: 20em;
            }
            .fade-box-front {
                transform: translate(0%,0%);
            }
            .overlay {
                position:absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                height: 100%;
                width: 100%;
                opacity: 0;
                transition: .5s ease;
                text-align:left;
            }
            .overlay p{
                position:absolute;
                top: 0;
                height: 100%;
                width: 80%;
                margin:0 0 0 0;
                padding-left:0em;
                font-size: 1.4em;
                transform: translate(15%,25%);
            }
            .fade-box:hover .overlay {
                opacity: 1;
            }
            .fade-box:hover .fade-box-front {
                opacity: 0;
            }
            /* fade in/out effect */

            /* 3D flip image effect */
            .flip-box { 
                width: 40%;
                background-color: transparent;
                perspective: 1000px; 
                top:15vh;
                transform: translate(-50%,20%);
            }
            .flip-box-inner {
                position: relative;
                width: 100%;
                height: 100%;
                text-align: center;
                transition: transform ;
                transform-style: preserve-3d;
                animation: rotateY 6s infinite;
            }
            @-webkit-keyframes rotateY {
                0% { transform: rotateY( 0deg); }
                15% { transform: rotateY( 0deg); }
                48% { transform: rotateY( 180deg); }
                76% { transform: rotateY( 180deg); }
                100% { transform: rotateY( 360deg); }
            }
            .flip-box-front, .flip-box-back {
                position: absolute;
                width: 100%;
                height: 100%;
                -webkit-backface-visibility: hidden; /* Safari */
                backface-visibility: hidden;
            }
            .flip-box-back {
                transform: rotateY(180deg);
            }
            .flip-box-front img, .flip-box-back img{
                width: 100%;
                height: auto;
            }
            /* 3D flip image effect */
            
            .tag{
                opacity: 0.5;
            }
            .price{
                float:right;
                opacity: 1;
            }
            /* floating window effect */
            .floatingWindow{
                position:absolute;
                z-index:10;
                top:0;
                width:100%;
                height:100%;
                overflow:hidden;
            }
            .close{
                position:fixed;
                top:4em;
                right:0;
                padding-right:1em;
                padding-top:0.5em;
            }
            .close:hover {
                cursor:pointer;
            }
            #cardDetails{
                display:none;
            }
            .card{
                width:18vw;
                position:relative;
                top:4em;
                left:30%;
            }
            /* floating window effect */

            
            .userPage, .leaderboardPage{
                display:none;
                padding-left:4em;
            }
            .activePage, .activeLeaderBoard{
                display:block;
            }
            .cartPage{
                padding-left:4em;
            }
            .history table {
                border-collapse:collapse;
            }
            .history tr {
                border-bottom:1px solid #e2e4e5;
            }
        </style>
    </head>
<body onload="">
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script type="text/javascript">
        const uid = "<?= $uid ?>";
        const fullName = "<?= $fullName ?>";
        const currentCohort = "<?= $currentCohort ?>"; 
        const apiURL = "https://script.google.com/macros/s/AKfycbyuWfg-e2IYAFJHaAi5n67JWPc953pnA0XrJF-uLhUUzJu9TI_Ec8jP5MBvlFMVXqjAOw/exec";
        var cartItem=[];
    </script>
    <script type="text/javascript" src="view/activeButton.js"></script>
    <div class="topnav">
        <h2><a class='topBtn' onclick="changeActiveMain('Welcome');" style="margin-right: 0.5em;">The Hidden Tuck Shop</a></h2>by Moriarty Academy
        <span class='topBtnContainer'>
            <a class='topBtn' onclick="changeActiveMain('About');">About</a>
            <a class='topBtn' onclick="changeActiveMain('Shop');">Shop</a>
            <a class='topBtn' onclick="changeActiveMain('Leaderboard');">Leaderboard</a>
            <a class='topBtn' onclick="changeActiveMain('Management');" id='admin' style='display:none'>Management</a>
            <a class='topBtn' onclick="changeActiveMain('FAQ');">FAQ</a>
            <a class='topBtn' onclick="changeActiveMain('User');"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></a>
            <a class='topBtn' onclick="changeActiveMain('Cart');"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/></svg></a>
            <a class='topBtn' href='?logout='>Logout</a>
        </span>
    </div>

    <!--Welcome-->
    <div class='main active' id='Welcome'>
        <div class='section'>
            <div class='leftBox'>
                <span class='center' style='left:25%;top:15vh'>
                    <p class='title'> Welcome, <?php echo $fullName?></p>
                    <p>Step into the Hidden Tuck Shop where magical cards hold the power of Black Magic. Exclusive access ensures only the chosen ones can unlock its secrets.</p>
                    <p>Craving more time? A second chance? Some tips? Or perhaps some brain fuel? Here, we have the magical touch for all your class needs. Embark on your enchanted journey now.</p>
                    <p><button class='shopButton' onclick="changeActiveMain('Shop');"><i class="fa-solid fa-bag-shopping"></i> Shop Now</button> </p>
                </span>
            </div>
            <div class='rightBox'>

                <div class="center flip-box">
                    <div class="flip-box-inner">
                        <div class="flip-box-front">
                            <img src='view/Card/card-00a.png'>
                        </div>
                        <div class="flip-box-back">
                            <img src='view/Card/card-00b.png'>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class='section' style='background-color: white;display:none'>
            <p class='title' style='text-align:center;margin-bottom:2em'> HOW CAN WE HELP YOU?</p>
            <div class='flex-row'>
                <div class='col-4'>
                    <p class='center'>I WANT <br>MORE TIME</p>
                </div>
                <div class='col-4'>
                    <p class='center'>I WANT <br>ONE MORE CHANCE</p>
                </div>
                <div class='col-4'>
                    <p class='center'>I WANT <br>SOME HELP</p>
                </div>
                <div class='col-4'>
                    <p class='center'>I WANT <br>IT ALL</p>
                </div>
            </div>
        </div>
    </div>

    <!--About-->
    <div class='main ' id='About'>
        <div class='section'>
            <div class='leftBox' style="left:15vw;">
                <span style="margin-left:4em;transform:translate(50%,0);width:80%">
                    <p class='title' style='margin-top:1em'> Shape Your Learning. <br>Master Your Teaching.</p>
                    <p>Welcome to the Hidden Tuck Shop, the heart of Moriarty Academy. </p>
                    <p>With our cards, you hold the power to tailor your academic journey. Every card can be a game-changer. Need extra teaching time? Sand Timer is your answer. Craving a second chance at a challenging task? Reach for <i>Glory in Death.</i></p>
                    <p>Venture forth, make your choices, and seize control. In the realm of Moriarty Academy, the magic of learning is truly in your grasp.</p>
                </span>
            </div>
            <div class='rightBox' style="right:-10vw;">
                <img class='singleImg' src='view/Card/card-00b.png'>                
            </div>
            
            <p style="top:75vh;left:0;transform:translate(40%,0);position:relative;font-size:2em;"><i class="fa fa-angle-down"></i> Explore more</p>
        </div>
        <div class='section' style='background-color: white;'>
            <p class='title' style='text-align:center;'> How it works?</p>
            <p style='text-align:center;margin-bottom:2em;'>Hover over each square to discover the magic of mCoins!</p>
            <div class='flex-row'>
                <div class='col-3 fade-box' style="background-color:#EDDEB9;">
                    <p class='center fade-box-front'><span class='squaretitle'>1<br>Earn</span></p>
                    <div class="overlay">
                        <p class="squaretext">Complete course activities to earn mCoins – the Moriarty Academy's currency.</p>
                    </div>
                </div>
                <div class='col-3 fade-box' style="background-color:#D4E7F1;">
                    <p class='center fade-box-front'><span class='squaretitle'>2<br>Buy</span></p>
                    <div class="overlay">
                        <p  class="squaretext">Browse the Hidden Tuck Shop and spend mCoins on magical cards, each offering its own unique benefit.</p>
                    </div>
                </div>
                <div class='col-3 fade-box' style="background-color:#DFD9F2;">
                    <p class='center fade-box-front'><span class='squaretitle'>3<br>Collect</span></p>
                    <div class="overlay">
                        <p class="squaretext">Pick up your cards in class, unleash their magic, and take charge of your learning experience.</p>
                    </div>
                </div>
            </div>
            
            <p class='title' style='text-align:center;'> Deep Dive into the mCoin System: </P>
            <div class='flex-row'>
                <span style='transform: translate(15vw,0%);text-align:left;font-size:1.2em;width:70vw;margin-bottom:2em'>
                <p>1. Understanding Balances:</p>
                <table>
                    <tr>
                        <td style="padding-right:0"><img src='view/FAQ/1 Personal Balance.png' class='icon'></td>
                        <td><b>Personal Balance:</b> Complete individual tasks to earn mCoins. These mCoins are added to your personal balance.</td>
                    </tr>
                    <tr>
                        <td style="padding-right:0"><img src='view/FAQ/2 Group Balance.png' class='icon'></td>
                        <td><b>Group Balance:</b> When your group completes a task, the earned mCoins go into your group's shared balance.</td>
                    </tr>
                </table>
                <p>2. Making Purchases:</p>
                <table>
                    <tr>
                        <td style="padding-right:0"><img src='view/FAQ/3 For yourself.png' class='icon'></td>
                        <td><b>For Yourself:</b> Use your personal balance to buy individual rewards. Only you can access and spend these mCoins.</td>
                    </tr>
                    <tr>
                        <td style="padding-right:0"><img src='view/FAQ/4 For the Group.png' class='icon'> </td>
                        <td><b>For the Group:</b> The group balance is used to purchase group rewards. All members have access to the group balance.</td>
                    </tr>
                </table>
                <p>3. Transferring mCoins:</p>
                <table>
                    <tr>
                        <td style="padding-right:0"><img src='view/FAQ/5 friend to friend.png' class='icon'></td>
                        <td><b>Friend-to-Friend:</b> If you're short on mCoins, your friends can help! They can transfer mCoins to you using the Mori Payment System (MPS).</td>
                    </tr>
                    <tr>
                        <td style="padding-right:0"><img src='view/FAQ/6 pooling resources.png' class='icon'> </td>
                        <td><b>Pooling Resources for Group Rewards:</b> Group mCoins are for group rewards. However, if a group wants to buy a reward and is short on mCoins, the system will automatically use the personal balance of the member making the purchase.</p>
                    </tr>
                    <tr>
                        <td style="padding-right:0"></td>
                        <td>If that member doesn't have enough mCoins, other group members can transfer mCoins  to them using MPS, ensuring the group has enough mCoins for the purchase.</td>
                    </tr>
                </table>
                <p>4. Important Reminders:</p>
                <table>
                    <tr>
                        <td style="padding-right:0"><img src='view/FAQ/7 group mCoins are exclusive.png' class='icon'></td>
                        <td><b>Group mCoins are Exclusive:</b> Group mCoins can only be used for group rewards. They can't be used for personal purchases or transferred to a personal account.</td>
                    </tr>
                    <tr>
                        <td style="padding-right:0"><img src='view/FAQ/8 MPS for covering deficits.png' class='icon'></td>
                        <td><b>MPS for Covering Deficits:</b> If you or your group are short of mCoins for a reward, use the MPS transfer coins and cover the difference. Always communicate with your group members to ensure smooth transactions!</p>
                    </tr>
                    <tr>
                        <td style="padding-right:0"><img src='view/FAQ/9 irreversible.png' class='icon'></td>
                        <td><b>Irreversible Actions:</b> Once mCoins are spent/transfered, the transaction is set in stone. No turning back, no refunds. Make your choices wisely and double-check before finalizing!</td>
                    </tr>
                </table>
                <p>5. Tips for Success:</p>
                <table>
                    <tr>
                        <td style="padding-right:0"><img src='view/FAQ/10 Plan Ahead.png' class='icon'></td>
                        <td><b>Plan Ahead:</b> Have a vision. Decide on the rewards early and gather the mCoins needed.</td>
                    </tr>
                    <tr>
                        <td style="padding-right:0"><img src='view/FAQ/11 Unity is strength.png' class='icon'></td>
                        <td><b>Unity is Strength:</b> Tackling group tasks doesn't just amplify your group mCoins; it's the essence of teamwork. Double delight!</p>
                    </tr>
                    <tr>
                        <td style="padding-right:0"><img src='view/FAQ/12 speak share succeed.png' class='icon'></td>
                        <td><b>Speak, Share, Succeed:</b> Prioritize group chats before spending shared mCoins. Transparent talks prevent mix-ups and maintain harmony. Trust and talk - the two pillars of splendid teamwork!</td>
                    </tr>
                </table>
                </span>
            </div>
        </div>
    </div>

    <!--Shop-->
    <div class='main' id='Shop'>
        <div class='section' style='background-color: white;' id='cardList'>
            <div class='flex-row'>
                <button class='activebutton' id='all' onclick="changeActiveButton('all');">All Products</button>
                <button class='inactivebutton' id='Time Management' onclick="changeActiveButton('Time Management');">Time Management</button>
                <button class='inactivebutton' id='Expert Assistance' onclick="changeActiveButton('Expert Assistance');">Expert Assistance</button>
                <button class='inactivebutton' id='Second Chance' onclick="changeActiveButton('Second Chance');">Second Chance</button>
                <button class='inactivebutton' id='Brain Fuel' onclick="changeActiveButton('Brain Fuel');">Brain Fuel</button>
                <button class='inactivebutton' id='Achievement Unlocked' onclick="changeActiveButton('Achievement Unlocked');">Achievement Unlocked</button>
            </div>

            <div class='flex-container' id='cards'>
                <div>
                    <div class='overlayBox'>
                        <img src="view/Card/card-00.png">
                        <div class='overlayCard hoverCard'>
                            <div></div>
                            <p>Add to Cart</p>
                        </div>
                    </div>
                    <div class='description'>
                        name
                        <p><span class='tag'>tag</span><span class='price'>$price</span></p>
                    </div>
                </div>
            </div>
            <script type="text/javascript" src="control/cart.js"></script>
            <script type="text/javascript" src="view/card.js"></script>
            <script></script>      
        </div>

        <div class='section floatingWindow' id='cardDetails'>
            <div class='leftBox'>
                <img class='card' src="view/Card/card-01.png">
            </div>
            <div class='rightBox' style='right:6vw'>
                <p class='title'>Name</p>
                <p> description</p>
                <p> Limitation</p>
                <div style='border-top:solid 1px #d9d9d9'><p> $0000</p>
                    <button class='shopButton' style="background-color:#897CB0"  id='00' onclick='updateCart(this.id)'><i class="fa-solid fa-bag-shopping"></i>Add To Cart</button>
                </div>
                <div class='close' onclick='closeCardWindow()'>
                    <i class="fa fa-close"></i>Close
                </div>    
            </div>
        </div>
    </div>
    
     <!--Leaderboard-->
     <div class='main' id='Leaderboard'>
        <div class='section'>
            <div class='flex-row'>
                <button class='activePagebutton' id='HallofFame' onclick="changePageButton('HallofFame');">Hall of Fame</button>
                <button class='inactivebutton' id='groupLeaderboard' onclick="changePageButton('groupLeaderboard');">Group Leaderboard</button>
                 <button class='inactivebutton' id='individualLeaderboard' onclick="changePageButton('individualLeaderboard');">Individual Leaderboard</button>
            </div>
            <div class='leaderboardPage activeLeaderBoard' id='HallofFamePage'>
                <p class='title' style='position:relative;text-align:center' >Top 5 Groups All Time</p>  
                <div id='HallofFameTable' style='text-align:center'></div>  
                <p class='title' style='position:relative;text-align:center' >Top 5 Students All Time</p>  
                <div id='HallofFameTableI' style='text-align:center'></div>  
            </div>
            <div class='leaderboardPage' id='groupLeaderboardPage'>
                <p class='title' style='position:relative;text-align:center' >Group Leaderboard - <span id='userClass'></span></p>  
                <div style='text-align:center;padding-bottom:2em;' id="classSelection"></div>
                <div id='rankingTable' style='text-align:center'></div>  
            </div>
            <div class='leaderboardPage' id='individualLeaderboardPage'>
                <p class='title' style='position:relative;text-align:center' >Individual Leaderboard - <span id='userClass2'></span></p>  
                <div style='text-align:center;padding-bottom:2em;' id="classSelection2"></div>
                <div id='individualRankingTable' style='text-align:center'></div>  
            </div>
        </div>
        <script src="view/getLeaderboard.js"></script>
    </div>   

     <!--Management-->
     <div class='main' id='Management'>
        <div class='section' style='text-align:center'>
            <p>Choose a CSV file from Canvas: <input type="file" id="myfile"></p>
            <p>Cohort (e.g. Fall23): <input id="corhort"></p>
            <p>
                <button style='font-size:1em;margin-right:2em;height:100%' onclick="convertJSON('MTGroup')">Upload MT Group List</button>
                <button style='font-size:1em;margin-right:2em;height:100%' onclick="convertJSON('MCGrade')">Upload Module Challenge Grade</button>
                <button style='font-size:1em;margin-right:2em;height:100%' onclick="convertJSON('itemList')">Upload Rewards list (amount of each class)</button>
            </p>
            <h2 style='color:red'>Must save as CSV File First</h2>
            <p id="uploadStatus"></p>
            <script src="model/uploadFile.js"></script>
        </div>
    </div>            

    <!--FAQ-->
    <div class='main' id='FAQ'>
        <div class='section'>
            <p class='title' style='position:relative;text-align:center' >Frequently Asked Questions (FAQs)</p>
            <span style="display:block;position:relative;left:0;transform: translate(15vw,0%);text-align:left;font-size:1.2em;width:70vw;margin-bottom:2em">
                <p class="FAQ-topic" >mCoins & Transactions</p>
                <p class="FAQ-q" style="margin-top:0em;">1. How do I check my mCoin balance?</p>
                <p class="FAQ-a">Check both your personal and group balances by clicking the profile icon.</p>

                <p class="FAQ-q">2. What are mCoins?</p>
                <p class="FAQ-a">mCoins are the game tokens  of the Moriarty Academy. Earn them by completing tasks and then spend them to acquire reward cards.</p>

                <p class="FAQ-q">3. How are mCoins earned?</p>
                <p class="FAQ-a">By actively participating and completing challenges, as well as in pre-class, in-class, and post-class activities.</p>

                <p class="FAQ-q">4. What's the difference between personal and group mCoins?</p>
                <p class="FAQ-a">Personal mCoins are for your individual use, while group mCoins are shared among group members for group rewards.  If there aren't enough group mCoins for a group purchase, the system will automatically draw from your personal mCoins.</p>

                <p class="FAQ-q">5. How can I get mCoins from a friend?</p>
                <p class="FAQ-a"><b>Your friend should initiate</b> the transfer using the "MPS" function, which can be found under the "profile" icon, to transfer mCoins to you. They'll need to specify the amount and input your ITSC account details. Bear in mind, once done, this transaction is irreversible.</p>

                <p class="FAQ-q">6. Can I transfer mCoins from my personal balance to the group balance or vice versa?</p>
                <p class="FAQ-a">No. However, if the group balance is insufficient for a purchase, the shortfall will be deducted from the personal balance of the member initiating the purchase.</p>

                <p class="FAQ-topic" >Purchasing & Collection</p>
                <p class="FAQ-q" style="margin-top:0em;">1. Where can I see my purchased rewards?</p>
                <p class="FAQ-a">Find them under "Rewards" after clicking the profile icon.</p>

                <p class="FAQ-q">2. How do I collect a card I bought online?</p>
                <p class="FAQ-a">Collect your physical reward cards in class after ordering online. Please arrive 10 minutes before the class starts and approach the instructor.</p>

                <p class="FAQ-q">3. Why can't I buy some rewards, or why are they sold out?</p>
                <p class="FAQ-a">High-demand cards, such as "Blessing from Mr. Man", are available on a first-come, first-served basis. Plan your mCoin spending strategically. Some cards can be purchased once only.</p>

                <p class="FAQ-q">4. I forgot to collect my card. Now what?</p>
                <p class="FAQ-a">You can pick it up in your subsequent session. Remember, any purchases made after 5:00 PM the day prior to a class will be deferred to the following session. If not collected in the last session, these cards will revert back to the inventory, and no refunds will be issued.</p>

                <p class="FAQ-topic" >Card Usage & Retention</p>
                <p class="FAQ-q" style="margin-top:0em;">1. Do I need the physical card to use it?</p>
                <p class="FAQ-a">For cards including "Sand Timer", “Mystery Munchies” and "Blessing from Mr. Man," yes. Otherwise, you don't.</p>

                <p class="FAQ-q">2. Can I keep the cards?</p>
                <p class="FAQ-a">Absolutely! Treasure these cards as mementos of your educational journey, each marking a specific accomplishment and memory.</p>

                <p class="FAQ-topic" >Group Collaboration & Disputes</p>
                <p class="FAQ-q" style="margin-top:0em;">1. Can we individually add to our group's mCoins?</p>
                <p class="FAQ-a">Yes, but it's optional. Note that direct transfers from individual to group balances aren't possible. Discuss as a group before making decisions.</p>

                <p class="FAQ-q">2. How should we spend our Group Coins?</p>
                <p class="FAQ-a">Strategize and discuss. Remember, some cards are in limited supply.</p>

                <p class="FAQ-q" style="margin-top:0em;">3. What if we disagree on mCoin spending?</p>
                <p class="FAQ-a">Communicate openly and consider voting or seeking alternatives that benefit everyone.</p>

                <p class="FAQ-q">4. How do we ensure fair use of the group mCoins?</p>
                <p class="FAQ-a">Discuss and decide as a group before making any purchases using group mCoins. Communication is essential to ensure everyone's on the same page.</p>

                <p class="FAQ-q" style="margin-top:0em;">5. Can we refund or exchange a wrong group purchase?</p>
                <p class="FAQ-a">No. All purchases are final. Double-check decisions before buying.</p>

                <p class="FAQ-topic" >Technical Issues & Support</p>
                <p class="FAQ-q" style="margin-top:0em;">1. I'm having purchase issues. What should I do?</p>
                <p class="FAQ-a">Screenshot the problem and email our support team at <a href='mailto:ericyeung@ust.hk'>ericyeung@ust.hk</a></p>

                <p class="FAQ-q">2. The website isn’t working right. Any suggestions?</p>
                <p class="FAQ-a"  style="margin-bottom:0em;">For optimal performance:</p>
                <ul>
                    <li>Use updated versions of Chrome, Firefox, or Safari.</li>
                    <li>Disconnect from VPN if connected.</li>
                    <li>Try clearing the cache or using an incognito window.</li>
                </ul>

                <p class="FAQ-q" >3. My mCoins balance looks wrong. What next?</p>
                <p class="FAQ-a">Contact our support team with transaction details, and we'll sort it out.</p>
            </span>
            
        </div>
    </div>

    <!--User-->
    <div class='main' id='User'>
        <div class='section' style='background-color: white;' id='cardList'>
            <div class='flex-row'>
                <button class='activePagebutton' id='self' onclick="changePageButton('self');">My Balance</button>
                <button class='inactivebutton' id='group' onclick="changePageButton('group');">Group Balance</button>
                 <button class='inactivebutton' id='ownItems' onclick="changePageButton('ownItems');">Rewards Purchased</button>
                 <button class='inactivebutton' id='fps' onclick="changePageButton('fps');">MPS</button>
            </div>

            <div class='userPage activePage' id='selfPage'>
                <p><strong>Personal mCoins Balance</strong><span style="padding-left:2em;color:#897CB0;font-size:1.5em" id=selfmCoins>NA</span></p>
                <p><strong>mCoins history</strong>
                <div class='history' id='selfHistory'>
                    <table> 
                        <tr>
                            <td>Date</td>
                            <td>Description</td>
                            <td>Amount</td>
                        </tr>
                        <tr>
                            <td>NA</td>
                            <td>NA</td>
                            <td>NA</td>
                        </tr>
                    </table>
                </div>                
            </div>
 
            <div class='userPage' id='groupPage'>
                <p><strong>Group mCoins Balance</strong><span style="padding-left:2em;color:#897CB0;font-size:1.5em" id=groupmCoins>NA</span></p>
                <p><strong>mCoins history</strong>
                <div class='history' id='groupHistory'>
                    <table> 
                        <tr>
                            <td>Description</td>
                            <td>Amount</td>
                        </tr>
                        <tr>
                            <td>NA</td>
                            <td>NA</td>
                        </tr>
                    </table>
                </div>                
            </div>

            <div class='userPage' id='ownItemsPage' style="text-align:center">
                <strong >Personal Rewards</strong>
                <div class='flex-container' id='personalItem'>
                    <div>
                        <div class='overlayBox'>
                            <img src="view/Card/card-00.png">
                            <div class='overlayCard usedCard'>
                                <div></div>
                                <p>Used</p>
                            </div>
                        </div>
                    </div>
                </div>
                <strong >Group Rewards</strong>
                <div class='flex-container' id='groupItem'>
                    <div>
                        <div class='overlayBox'>
                            <img src="view/Card/card-00.png">
                            <div class='overlayCard'>
                                <div></div>
                                <p>Used</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class='userPage' id='fpsPage'>
                <p><strong>Mori Pay System (MPS)</strong></p>
                <p>
                I would like transfer <input id='transferAmount' min="0" type="number" oninput="validity.valid||(value='');" placeholder="positive numbers"> mCoins to <input id='target' placeholder="ITSC account, e.g.:'crystalluo'" style='width:20em'></input>
                </p>
                <p>
                Please ensure you've entered the correct amount and student ID. The PDEV6800Z teaching team is not responsible for any issues unrelated to system errors. Once you initiate the transfer, the transaction cannot be reversed or cancelled. 
                </p>
                <p>
                    <button class='shopButton' style='background-color:#897CB0' onclick="transfer()">Transfer</button>
                </P>   
                <script type="text/javascript" src="control/transfer.js"></script>           
            </div>
            
            <div class='section floatingWindow' id='loadingWindowF' style="display:none;text-align:center">
                <p><img id='imgResponseF' src="view/loading.png" width='100px'></p>
                <p><Strong id='purchaseResponseF'>Loading... Please Wait.</Strong></p>
                <p id='purchaseCloseF'>
                    <button class='shopButton' id='closeButtonF' onclick='closeLoadingWindow("F")'>Done</button>  
                </p>
            </div> 
        </div>
    </div>
    
    <!--Cart-->
    <div class='main' id='Cart'>
        <div class='section' id=''>
            <div class='cartPage'>
            <p><strong>Group + Personal Balance: </strong><span id=totalmCoins>0 + 0 = 0</span></p>
            <p><strong>Cart</strong></p>
                <div class='history' id='cartTable'>
                    <table> 
                        <tr>
                            <td>Rewards Name</td>
                            <td>Price</td>
                            <td>Check to Comfirm</td>
                        </tr>
                        <tr>
                            <td>NA</td>
                            <td>0</td>
                            <td><input type='checkbox' value=''></td>
                        </tr>
                    </table>
                </div> 
                
                <div class='history' id='priceTable' style="margin-top:2em">
                    <table> 
                        <tr>
                            <td><strong>Group Rewards Total Price</strong></td>
                            <td><strong>0</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Personal Rewards Total Price</strong></td>
                            <td><strong>0</strong></td>
                        </tr>
                    </table>
                </div> 
            </div> 
        </div> 
        <div class='section floatingWindow' id='loadingWindowP' style="display:none;text-align:center">
            <p><img id='imgResponseP' src="view/loading.png"  width='100px'></p>
            <p><Strong id='purchaseResponseP'>Loading... Please Wait.</Strong></p>
            <p id='purchaseCloseP' >
                <button class='shopButton' id='closeButtonP' onclick='closeLoadingWindow("P")'>Done</button>  
            </p>
        </div>     
        
        <script type="text/javascript" src="control/main.js"></script>
    </div> 
</body>
</html>