//ShowUpGallery v 1.0
//Easy and simple to use jQuery gallery plugin
//Author: Robin Zoň - itart.cz

$(function(){
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // - - - - - - - PLUGIN - SHOW UP GALLERY - - - - - - - - - - - - - - - - - - -
    function showUpGallery(object) {
         //Loading bar source
        var loadingBarSrc = "loading.gif";
        //Opacity of thumbnails
        var defaultOpacity = 0.7;
        //Thumbnails opacity hover time
        var hoverTime = 150;
        //Dark screen fade in/out time
        var darkScreenFadeInTime = 400;
        var darkScreenFadeOutTime = 400;
        //Control buttons hover time and opacity
        var contolButtonsHoverTime = 200;
        var controlButtonsOpacity = 1;
        //Image max width and height
        var imageContainerMaxWidth = "95%";
        var imageContainerMaxHeight = "95%";
        
        //Gets all gallery images
        var $images = $(object).find("img:not(.notInGallery)");
        
        //Active shown image index
        var $activeImageIndex = -1;
        //Next image to be shown (buffered)
        var $nextImage = null;
        //Prev image to be shown (not buffered)
        var $prevImage = null;
        
        //Dark screen - main image container
        var $darkScreen = null;
        //Outer image container
        var $imageContainer = null;
        //Image itself
        var $imageShown = null;
        //Navigation buttons
        var $imageContainerNextImage = null;
        var $imageContainerPrevImage = null;
        //Loading gif
        var $imageContainerLoadingBar = null;
        
        //Set thumbnails cursor and opacity
        $images.css({"cursor":"pointer","opacity":defaultOpacity});
        
        //Set thumbnails hover - opacity
        $images.hover(
        function()
        {
            $(this).stop().animate({"opacity":"1"},hoverTime);
        },
        function()
        {
            $(this).stop().animate({"opacity":defaultOpacity},hoverTime);
        });
        
        //Set thumbnails onclick
        $images.click(function(){
            showImage(true,this);
        });
        
        
        // - - - - - - - - - - - - - FUNCTION - Show darkScreen and an image - - - - - - - - - - - - - - - - - 
        var showImage = function(switchOn,image)
        {
            //Show darkScreen
            if(switchOn)
            {
                //Get current image and it's index based on user's click
                $image = $(image);
                $activeImageIndex = $images.index($image);
                
                //If it's the first time
                if($darkScreen==null)
                {
                    //Create dark screen
                    div = '<div id="showUpGalleryBlanket" class="noselect" style="width:100%;height:100%;display:block;position:fixed;top:0;opacity:0;z-index:9999999999999;background-color:rgba(0,0,0,0.5)"></div>';
                    $("body").append(div);
                    $darkScreen=$("#showUpGalleryBlanket");
                    
                    //Create image container
                    div = '<div id="showUpGalleryImageContainer" class="noselect" style="color:#DDDDDD;text-align:center;line-height:0px;min-height:10vh;min-width:15%;max-width:'+imageContainerMaxWidth+';max-height:'+imageContainerMaxHeight+';position:absolute;top:0;z-index:101;background-color:rgba(0,0,0,0.7);box-shadow:0px 0px 8px 1px #000000;"></div>';
                    $darkScreen.append(div);
                    $imageContainer=$("#showUpGalleryImageContainer");
                                 
                    //Create loading bar
                    div = '<div id="showUpGalleryloagingBar" class="noselect" style="width:100%;height:100%;margin:0px auto;z-index:102;display:none;position:absolute;"><img style="height:30px;position:absolute;top:2%;right:2%;" src="'+loadingBarSrc+'" alt="loading"></div>';
                    $imageContainer.append(div);
                    $imageContainerLoadingBar = $("#showUpGalleryLoagingBar");               
                                    
                    //If more than one image is in the gallery
                    if($images.length>1)
                    {
                        //Create next image control button
                        div = '<div id="showUpGalleryNextImage" class="noselect" style="opacity:0;height:100%;width:80%;z-index:103;position:absolute;right:0;top:0;cursor:pointer;"><div style="opacity:0.5;top:50%;right:3%;margin-top:-12px;width:23px;position:absolute;font-family:Verdana;font-weight:bold;font-size:17px;font-weight:bold;background-color:rgba(0,0,0,0.8);border:2px solid rgba(255,255,255,0.7);color:#CCCCCC;line-height:23px;border-radius:22px;padding:2px 3px 4px 4px;">&gt;</div></div>'
                        $imageContainer.append(div);
                        $imageContainerNextImage = $("#showUpGalleryNextImage");
                        
                        //Create prev image control button
                        div = '<div id="showUpGalleryPrevImage" class="noselect" style="opacity:0;height:100%;width:20%;z-index:103;position:absolute;left:0;top:0;cursor:pointer;"><div style="opacity:0.5;top:50%;left:10%;margin-top:-12px;width:23px;position:absolute;font-family:Verdana;font-weight:bold;font-size:17px;font-weight:bold;background-color:rgba(0,0,0,0.8);border:2px solid rgba(255,255,255,0.7);color:#CCCCCC;line-height:23px;border-radius:22px;padding:2px 4px 4px 2px;">&lt;</div></div>'
                        $imageContainer.append(div);
                        $imageContainerPrevImage = $("#showUpGalleryPrevImage");
                    }
                    
                    //Create close icon
                    div = '<div id="showUpGalleryCloseIcon" class="noselect" style="width:20px;position:absolute;top:-17px;right:-17px;z-index:104;cursor:pointer;font-family:Verdana;font-size:15px;font-weight:bold;background-color:#222222;border:2px solid #DDDDDD;color:#DDDDDD;line-height:20px;border-radius:22px;padding:4px;">X</div>';
                    $imageContainer.append(div);
                    $imageContainerCloseIcon = $("#showUpGalleryCloseIcon");
                    
                    //Show the dark screen                   
                    $darkScreen.stop().animate({"opacity":"1"},darkScreenFadeInTime);
                    
                    //Assign noselect to the divs
                    $(".noselect").css({"-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none"});
                }
                else
                {
                    //Dark screen was already created, we need just to put the stuff in there
                    $("body").append($darkScreen);
                    $darkScreen.append($imageContainer);
                    //If more than one image is in the gallery
                    if($images.length>1)
                    {
                        $imageContainer.append($imageContainerNextImage);
                        $imageContainer.append($imageContainerPrevImage);
                    }
                    $imageContainer.append($imageContainerLoadingBar);
                    $imageContainer.append($imageContainerCloseIcon);
                    
                    //Show the dark screen
                    $darkScreen.stop().animate({"opacity":"1"},darkScreenFadeInTime);
                }
                
                
                $imageContainerLoadingBar.show();
                //Preload the image
                img = new Image();
                img.onload = function() {
                    //Put the image in the container
                    div = '<img id="showUpGalleryImage" class="noselect" src="'+$image.attr("data-image")+'" alt="'+$image.attr("alt")+'"/>';
                    $imageContainer.append(div);
                    $imageShown = $("#showUpGalleryImage");

                    //Resize and center the container
                    resizeImageContainer();
                    centerImageContainer();
                    
                    //If more than one image is in the gallery
                    if($images.length>1)
                    {
                        //Buffer next image
                       bufferNextImage();                       
                    }
                    
                    $imageContainerLoadingBar.hide();
                };
                img.src = $image.attr("data-image");

                // + + + + + + + + + EVENTS + + + + + + + + + + 
                
                //ONCLICK - Hide the dark screen
                $darkScreen.click(function(){
                   showImage(false);
                });
                
                //PREVENT ONCLICK on the image
                $imageContainer.click(function(event){
                    event.preventDefault();
                    return false;
                });
                            
                //If more than one image is in the gallery
                if($images.length>1)
                {
                    //HOVER over image container - add next and prev image buttons
                    $imageContainer.hover(function(){
                        $imageContainerNextImage.stop().animate({"opacity":controlButtonsOpacity},contolButtonsHoverTime);
                        $imageContainerPrevImage.stop().animate({"opacity":controlButtonsOpacity},contolButtonsHoverTime);
                    },function(){
                        $imageContainerNextImage.stop().animate({"opacity":0},contolButtonsHoverTime);
                        $imageContainerPrevImage.stop().animate({"opacity":0},contolButtonsHoverTime); 
                    });
                    
                    //ONCLICK - Shows next image
                    $imageContainerNextImage.click(function(event){
                       $imageContainerLoadingBar.show();
                       nextImage();
                    });
                    
                    //ONCLICK - Shows prev image
                    $imageContainerPrevImage.click(function(event){
                       $imageContainerLoadingBar.show();
                       prevImage();
                    });
                
                    //HOVER - Hover over prev image control button
                    $imageContainerPrevImage.hover(function(){
                        $(this).find(":first-child").stop().animate({"opacity":1},contolButtonsHoverTime*0.6);
                    },function(){
                        $(this).find(":first-child").stop().animate({"opacity":0.5},contolButtonsHoverTime*0.6);
                    });

                    
                    //HOVER - Hover over next image control button
                    $imageContainerNextImage.hover(function(){
                        $(this).find(":first-child").stop().animate({"opacity":1},contolButtonsHoverTime*0.6);
                    },function(){
                        $(this).find(":first-child").stop().animate({"opacity":0.5},contolButtonsHoverTime*0.6);
                    });
                }
                
                //PREVENT ONCLICK on the image
                $imageContainerCloseIcon.click(function(event){
                    event.preventDefault();
                    showImage(false);
                    return false;
                });
                
                //ON RESIZE windows center and resize the image
                $(window).resize(function() {
                    if($activeImageIndex != -1)
                    {
                        resizeImageContainer();
                        centerImageContainer();
                    }
                });
                
                //ON KEYUP buttons to navigate
                $(document).keyup(function(e) {
                    if($activeImageIndex != -1)
                    {
                        if(e.which == 27)
                        { 
                            showImage(false);
                        }                       
                        else if((e.which == 39 || e.which == 38 || e.which == 33) && $images.length>1)
                        {
                            nextImage();
                            e.preventDefault();
                        }
                        else if((e.which == 37  || e.which == 40 || e.which == 34) && $images.length>1)
                        {
                            prevImage();
                            e.preventDefault();
                        }
                    }
                });
            }
            else
            {
                //Hide darkScreen, remove all the elements from the screen
                $darkScreen.stop().animate({"opacity":"0"},darkScreenFadeOutTime,function(){
                    $darkScreen.remove();
                    $imageContainer.remove();
                    $imageShown.remove();
                    //If more than one image is in the gallery
                    if($images.length>1)
                    {
                        $imageContainerNextImage.remove();
                        $imageContainerPrevImage.remove();
                    }
                    $imageContainerLoadingBar.remove();
                    $imageContainerCloseIcon.remove();
                    $activeImageIndex = -1;
                });
            }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        
        // - - - - - - - - - - - - - FUNCTION - Shows prev image - - - - - - - - - - - - - - - - - - -
        var prevImage = function()
        {
            //Get prev image and recount activeImageIndex
            $prevImage =  $($images[$activeImageIndex-1]);
            $activeImageIndex--;
            if(!$prevImage.length)
            {
                $prevImage = $($images[$images.length-1]);
                $activeImageIndex = $images.length-1;
            }
            
            //Preload the image
            img = new Image();
            img.onload = function() {
                $imageShown.attr("src",$prevImage.attr("data-image"));
                $imageShown = $("#showUpGalleryImage");
            };
            img.src = $prevImage.attr("data-image");
            
            //If onload wasn't bounded
            if(!$imageShown.hasClass("boundedOnLoad"))
            {
                //On image loaded resize and center image, hide loadingbar, buffer next image
                $imageShown.load(function(ev)
                {
                    $imageShown.addClass("boundedOnLoad");
                    resizeImageContainer();
                    centerImageContainer();
                    $imageContainerLoadingBar.hide();
                    //Buffer next image
                    bufferNextImage();                    
                });
            }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        // - - - - - - - - - - - - - FUNCTION - buffers next image - - - - - - - - - - - - - - - - - -
        var bufferNextImage = function()
        {
            //Finds what's next
            $nextImage =  $($images[$activeImageIndex+1]);
            if(!$nextImage.length)
            {
                $nextImage = $($images[0]);
            }
            //Buffers next image
            $('<img/>')[0].src = $nextImage.attr("data-image");
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        
        // - - - - - - - - - - - - - FUNCTION - Shows next image - - - - - - - - - - - - - - - - - - -
        var nextImage = function()
        {
            //Preload image
            img = new Image();
            img.onload = function() {
                $imageShown.attr("src",$nextImage.attr("data-image"));
                $imageShown = $("#showUpGalleryImage");
                
                //Change the index to next image                
                $activeImageIndex++;
                if($activeImageIndex>($images.length - 1))
                {
                    $activeImageIndex = 0;
                }
            };
            img.src = $nextImage.attr("data-image");
            
            //If onload wasn't bounded
            if(!$imageShown.hasClass("boundedOnLoad"))
            {
                //On image loaded resize and center image, hide loadingbar, buffer next image
                $imageShown.load(function(ev)
                {
                    $imageShown.addClass("boundedOnLoad");
                    resizeImageContainer();
                    centerImageContainer();
                    $imageContainerLoadingBar.hide();
                    //Buffer next image
                    bufferNextImage();
                });
            }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        
        // - - - - - - - - - - - - - FUNCTION - fit the image in the container - - - - - - - - - - - -
        var resizeImageContainer = function()
        {
            //Reset css
            $imageShown.css({"width":"auto","height":"auto"});
            
            //Get image width and height
            imageWidth = $imageShown.width();
            imageHeight = $imageShown.height();
            
            //Get max width and height
            maxWidth = parseFloat($imageContainer.css("max-width"));
            maxHeight = parseFloat($imageContainer.css("max-height"));
            
            //Get min width and heigh
            minWidth = parseFloat($imageContainer.css("min-width"));
            minHeight = parseFloat($imageContainer.css("min-height"));
            
            //If max/min is in % recount to pixels
            if($imageContainer.css("max-width").indexOf("%")>=0)
            {
                maxWidth = $(window).width() * (maxWidth/100);
            }
            if($imageContainer.css("max-height").indexOf("%")>=0)
            {
                maxHeight = $(window).height() * (maxHeight/100);
            }
            if($imageContainer.css("min-width").indexOf("%")>=0)
            {
                minWidth = $(window).width() * (minWidth/100);
            }
            if($imageContainer.css("min-height").indexOf("%")>=0)
            {
                minHeight = $(window).height() * (minHeight/100);    
            }                                   
            
            //Count the ratio of the image and container
            imageRatio = imageWidth / imageHeight;
            containerRatio = maxWidth / maxHeight;
            
            //If image is more horizontal than container
            if(imageRatio>containerRatio)
            {
                //If image is smaller than maxWidth
                if(maxWidth>imageWidth)
                {
                    //If image is smaller than minWidth
                    if(imageWidth<minWidth)
                    {
                        width = minWidth;
                    }
                    else
                    {
                       width = imageWidth;
                    }
                }
                else
                {
                    width = maxWidth;
                }
                
                //Count height of image (IE)
                height = width / imageRatio;
                //Set the values
                $imageShown.css({"width":width+"px","height":height+"px"});
            }
            else
            {
                
                //If image is smaller than maxHeight
                if(maxHeight>imageHeight)
                {
                    //If image is smaller than minHeight
                    if(imageHeight<minHeight)
                    {
                        height = minHeight;
                    }
                    else
                    {
                        height = imageHeight;
                    }
                }
                else
                {
                    height = maxHeight;
                }
                
                //Count the width of image
                width = height * imageRatio;
                //Set the values
                $imageShown.css({"width":width+"px","height":height+"px"});
            }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        

        // - - - - - - - - - - - - - FUNCTION - center the image int the dark screen - - - - - - - - -
        var centerImageContainer = function()
        {
            marginTop = ($(window).height() - $imageContainer.height()) / 2;
            marginLeft = ($(window).width() - $imageContainer.width()) / 2;
            
            $imageContainer.css({"margin-top":marginTop+"px","margin-left":marginLeft+"px"});
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    //Add function to jQuery selectors
    $.fn.showUpGallery = function() {
        return this.each(function()
        {
            new showUpGallery(this);
        });
    }
    
    //Attach gallery to all .showUpGallery divs
    $(".showUpGallery").showUpGallery();
});