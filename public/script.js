// Selecting DOM elements
const color1Input = document.getElementById("color1");
const color2Input = document.getElementById("color2");
const color3Input = document.getElementById("color3");
const gradientTypeInput = document.getElementById("gradientType");
const preview = document.getElementById("preview");
const gradientBlockIpad = document.getElementById("gradient-block-ipad");
const gradientBlock = document.getElementById("gradient-block");
const cssOutput = document.getElementById("cssOutput");
const sassOutput = document.getElementById("sassOutput");
const lessOutput = document.getElementById("lessOutput");
const directionInput = document.getElementById("direction-linear");
const directionInput2 = document.getElementById("direction-radial");
const directionInput3 = document.getElementById("direction-conic");

const customInput = document.getElementById("custom-angle");
const opacity1Input = document.getElementById("opacity1");
const opacity2Input = document.getElementById("opacity2");
const opacity3Input = document.getElementById("opacity3");
const randomButton = document.getElementById("randombutton");
const randomButton2 = document.getElementById("randombutton2");
const randomButton3 = document.getElementById("randombutton3");
const download = document.getElementById("download");
const presetValue = document.getElementById("presetValue");
const appliedGradient = document.getElementById("appliedgradient");

let gradientCSS = null;


function preset() {
  console.log(typeof presetValue.value);

  preview.setAttribute("style",`background: ${presetValue.value}`);



  cssOutput.value = `background: ${presetValue.value}`;
  sassOutput.value = `@mixin gradient-bg {
          ${presetValue.value};
    }
  .my-class {
  @include gradient-bg;
}`;

  lessOutput.value = `.gradient-bg() {
      ${presetValue.value};
    }

  .my-class {
  .conic-gradient-bg;
  }`;

}

function validateGradientLength(gradientString) {
  const minLength = 30; // Adjust the minimum length as needed
  const maxLength = 250;

  if (gradientString.length < minLength || gradientString.length > maxLength) {
    return alert("Enter a Valid gradient");
  }

  return 0;
}






//hover effect

// Add mouseover event to change style when hovered
cssOutput.addEventListener("mouseover", function () {
  cssOutput.style.background = "rgb(47, 42, 42)"; // Setting background color
  cssOutput.style.transform = "scale(1.005)"; // scale effect
});

// Add mouseout event to revert style when hover ends
cssOutput.addEventListener("mouseout", function () {
  cssOutput.style.background = gradientCSS;; // Reset background to original or empty string
  cssOutput.style.transform = "scale(1)"; // revert scale effect
});

sassOutput.addEventListener("mouseover", function () {
  sassOutput.style.background = "rgb(47, 42, 42)"; // Setting background color
  sassOutput.style.transform = "scale(1.005)"; // scale effect
});

// Add mouseout event to revert style when hover ends
sassOutput.addEventListener("mouseout", function () {
  sassOutput.style.background = gradientCSS; // Reset background to original or empty string
  sassOutput.style.transform = "scale(1)"; // revert scale effect
});

lessOutput.addEventListener("mouseover", function () {
  lessOutput.style.background = "rgb(47, 42, 42)"; // Setting background color
  lessOutput.style.transform = "scale(1.005)"; // scale effect
});

// Add mouseout event to revert style when hover ends
lessOutput.addEventListener("mouseout", function () {
  lessOutput.style.background = gradientCSS; // Reset background to original or empty string
  lessOutput.style.transform = "scale(1)"; // revert scale effect
});

























//this function is complex will wait for it to be done
function downloadFile() {

  
  const [color1RGBA, color2RGBA, color3RGBA] = rgbaMethod();
  const [direction, direction2, direction3] = directions();
  const gradientTypeValue = gradientTypeInput.value;
  const gradientCSSView = gradientCSS; // Get gradient CSS from the textarea
  const size = Number(download.value) || 500; // Set size for the gradient image, default to 500px

  console.log(gradientTypeValue);

  // Create a canvas element
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  // Get the canvas context
  const ctx = canvas.getContext("2d");

  // Create the gradient depending on the type (conic, linear, etc.)
  let gradient;

  if (gradientTypeValue.includes("conic")) {
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillRect(0, 0, size, size);

    //////////////////////////////////

    // Canvas center point
    const centerX = size / 2;
    const centerY = size / 2;

    // Starting angle in radians for "from" options
    let startAngle = (( - 90) * Math.PI) / 180;

    // Convert the "from" angle to radians
    if (direction3.startsWith("from")) {
      const angle = direction3.split(" ")[1]; // Extract the angle (e.g., "0deg", "45deg", etc.)
     
      startAngle = ((parseInt(angle) - 90) * Math.PI) / 180; // Convert to radians
    }

    // Define the center coordinates for the "at" options
    let centerXCoord = centerX;
    let centerYCoord = centerY;

    // Ensure 'size' is a valid non-zero number
    if (isNaN(size) || size <= 0) {
      console.error("Invalid size value.");
      return; // Exit if size is invalid
    }

    // Handle "at" options for center positions and custom positions
    if (direction3.includes("at")) {
      const position = direction3.split("at ")[1].trim(); // Extract position like "center", "top left", etc.

      if (position === "center") {
        centerXCoord = centerX;
        centerYCoord = centerY;
      } else if (position === "top left") {
        centerXCoord = 0;
        centerYCoord = 0;
      } else if (position === "top right") {
        centerXCoord = size;
        centerYCoord = 0;
      } else if (position === "bottom left") {
        centerXCoord = 0;
        centerYCoord = size;
      } else if (position === "bottom right") {
        centerXCoord = size;
        centerYCoord = size;
      } else {
        // For custom positions like "at 25% 25%" or "at 50% 10%"
        const positionParts = position.split(" ");

        // Validate percentage values before using them
        if (positionParts.length === 2) {
          const percentX = parseFloat(positionParts[0]);
          const percentY = parseFloat(positionParts[1]);

          // Check if percentages are valid numbers (finite and not NaN)
          if (
            !isNaN(percentX) &&
            !isNaN(percentY) &&
            isFinite(percentX) &&
            isFinite(percentY)
          ) {
            centerXCoord = (percentX / 100) * size;
            centerYCoord = (percentY / 100) * size;
          } else {
            console.error(
              "Invalid percentage values for position: " + position
            );
            // Default to center if invalid
            centerXCoord = centerX;
            centerYCoord = centerY;
          }
        } else {
          console.error("Invalid position format: " + position);
          // Default to center if format is incorrect
          centerXCoord = centerX;
          centerYCoord = centerY;
        }
      }
    }

    // Make sure the center coordinates are finite numbers before creating the gradient
    if (!isFinite(centerXCoord) || !isFinite(centerYCoord)) {
      console.error("Invalid center coordinates: ", centerXCoord, centerYCoord);
      return; // Exit to avoid passing invalid values to createConicGradient
    }


    console.log(startAngle, centerXCoord, centerYCoord);

    // Create the conic gradient using the calculated values
    gradient = ctx.createConicGradient(startAngle, centerXCoord, centerYCoord);

    //////////////////////////////////////

    gradient.addColorStop(0, `${color1RGBA}`);
    gradient.addColorStop(0.5, `${color2RGBA}`);
    gradient.addColorStop(1, `${color3RGBA}`);
  } else if (gradientCSSView.includes("linear")) {
    /*
     Why This Happens
     Canvas Transparency Blending:

     The canvas blends transparent gradient stops (rgba) with the canvas's default background, which is usually fully transparent 
     (rgba(0, 0, 0, 0) by default). This blending creates a darker appearance, 
     especially when lighter colors have low alpha values (e.g., 0.1 or 0.3).
   */

    // solution1: Fill the canvas with a solid white background
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillRect(0, 0, size, size); // Ensure this covers the entire canvas

    // solution 2
    /*

    Use globalAlpha for Transparency
    Another approach is to adjust the global transparency using ctx.globalAlpha:
    ctx.globalAlpha = 0.8; // Set a higher transparency for the entire gradient
    This ensures all colors are blended more evenly with the background.
    */


    if (direction === "to right") {
      // Gradient from left to right
      gradient = ctx.createLinearGradient(0, 0, size, 0);
    } else if (direction === "to left") {
      // Gradient from right to left
      gradient = ctx.createLinearGradient(size, 0, 0, 0);
    } else if (direction === "to top") {
      // Gradient from bottom to top
      gradient = ctx.createLinearGradient(0, size, 0, 0);
    } else if (direction === "to bottom") {
      // Gradient from top to bottom
      gradient = ctx.createLinearGradient(0, 0, 0, size);
    } else if (direction === "45deg") {
      // Gradient at a 45-degree angle (top-left to bottom-right)
      gradient = ctx.createLinearGradient(0, size, size, 0);
    } else if (direction === "135deg") {
      // Gradient at a 135-degree angle (top-right to bottom-left)
      gradient = ctx.createLinearGradient(0, 0, size, size);
    }







    gradient.addColorStop(0, `${color1RGBA}`);
    gradient.addColorStop(0.5, `${color2RGBA}`);
    gradient.addColorStop(1, `${color3RGBA}`);
  } else {
    // Fallback or radial gradient

    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillRect(0, 0, size, size);


/////////////////////////////////////////////

  // Canvas center point
  const centerX = size / 2;
  const centerY = size / 2;

  // Default radius values for various "closest-side" and "farthest-side" options
  const closestSide = Math.min(size / 2, size / 2); // Minimum dimension
  const farthestSide = Math.max(size / 2, size / 2); // Maximum dimension

  // Handle different gradient options
  if (direction2 === "circle") {
    // Basic circle gradient from the center
    gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      size / 2
    );
  }
  // Ellipse gradient case
  else if (direction2 === "ellipse") {
    gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      size / 2
    );
  }
  // Closest side gradient for a circle
  else if (direction2 === "circle closest-side") {
    gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      closestSide
    );
  }
  // Farthest side gradient for a circle
  else if (direction2 === "circle farthest-side") {
    gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      farthestSide
    );
  }
  // Closest corner for a circle
  else if (direction2 === "circle closest-corner") {
    const cornerRadius = Math.hypot(centerX, centerY); // Distance to the nearest corner
    gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      cornerRadius
    );
  }
  // Farthest corner for a circle
  else if (direction2 === "circle farthest-corner") {
    const cornerRadius = Math.hypot(size - centerX, size - centerY); // Distance to the farthest corner
    gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      cornerRadius
    );
  }
  // Closest side gradient for an ellipse
  else if (direction2 === "ellipse closest-side") {
    gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      closestSide
    );
  }
  // Farthest side gradient for an ellipse
  else if (direction2 === "ellipse farthest-side") {
    gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      farthestSide
    );
  }
  // Closest corner for an ellipse
  else if (direction2 === "ellipse closest-corner") {
    const cornerRadius = Math.hypot(centerX, centerY);
    gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      cornerRadius
    );
  }
  // Farthest corner for an ellipse
  else if (direction2 === "ellipse farthest-corner") {
    const cornerRadius = Math.hypot(size - centerX, size - centerY);
    gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      cornerRadius
    );
  }
  // Cases with specific alignments (e.g., "circle closest-side at top")
  else if (direction2 === "circle closest-side at top") {
    gradient = ctx.createRadialGradient(centerX, 0, 0, centerX, 0, closestSide);
  } else if (direction2 === "circle closest-side at right") {
    gradient = ctx.createRadialGradient(
      size,
      centerY,
      0,
      size,
      centerY,
      closestSide
    );
  } else if (direction2 === "circle closest-side at bottom") {
    gradient = ctx.createRadialGradient(
      centerX,
      size,
      0,
      centerX,
      size,
      closestSide
    );
  } else if (direction2 === "circle closest-side at left") {
    gradient = ctx.createRadialGradient(0, centerY, 0, 0, centerY, closestSide);
  } else if (direction2 === "circle closest-side at center") {
    gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      closestSide
    );
  } else if (direction2 === "circle farthest-side at top") {
    gradient = ctx.createRadialGradient(
      centerX,
      0,
      0,
      centerX,
      0,
      farthestSide
    );
  } else if (direction2 === "circle farthest-side at right") {
    gradient = ctx.createRadialGradient(
      size,
      centerY,
      0,
      size,
      centerY,
      farthestSide
    );
  } else if (direction2 === "circle farthest-side at bottom") {
    gradient = ctx.createRadialGradient(
      centerX,
      size,
      0,
      centerX,
      size,
      farthestSide
    );
  } else if (direction2 === "circle farthest-side at left") {
    gradient = ctx.createRadialGradient(
      0,
      centerY,
      0,
      0,
      centerY,
      farthestSide
    );
  } else if (direction2 === "circle farthest-side at center") {
    gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      farthestSide
    );
  }





////////////////////////////////////////////////


     gradient.addColorStop(0, `${color1RGBA}`);
     gradient.addColorStop(0.5, `${color2RGBA}`);
     gradient.addColorStop(1, `${color3RGBA}`);
  }

  // Fill the canvas with the gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Generate the image data URL from the canvas
  const dataURL = canvas.toDataURL("image/png");

  // Create a link element to trigger the download
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "gradient.png"; // Set the download file name
  link.click(); // Trigger the download
}











function previewModeScreen() {
  // Request full screen
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    // Firefox
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    // IE/Edge
    document.documentElement.msRequestFullscreen();
  }

  

 const contentScreen = document.getElementsByClassName("content-container");
  //console.log(contentScreen[0]);
// console.log(typeof contentScreen[0]);

 
  contentScreen[0].setAttribute("hidden", true);
  contentScreen[1].setAttribute("hidden", true);

  setTimeout(() => {
    contentScreen[0].removeAttribute("hidden");
    contentScreen[1].removeAttribute("hidden");

  }, 6200);

}




 function copyToClipboardCss() {
   const cssCode = document.getElementById("cssOutput").value;

   navigator.clipboard
     .writeText(cssCode)
     .then(() => {
       console.log("CSS code copied to clipboard successfully!");
     })
     .catch((err) => {
       console.error("Failed to copy text: ", err);
     }); 

 }


function copyToClipboardSass() {
  
  const sassCode = document.getElementById("sassOutput").value;



  navigator.clipboard
    .writeText(sassCode)
    .then(() => {
      console.log("Sass code copied to clipboard successfully!");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}


function copyToClipboardLess() {

  const lessCode = document.getElementById("lessOutput").value;

  

  navigator.clipboard
    .writeText(lessCode)
    .then(() => {
      console.log("less code copied to clipboard successfully!");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}






























function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomOpacity() {
  return Math.random();

}

randomButton.addEventListener("click", () => {
  const randomColor1 = getRandomColor();
  const randomColor2 = getRandomColor();
  const randomColor3 = getRandomColor();
  const randomOpacity1 = getRandomOpacity();
  const randomOpacity2 = getRandomOpacity();
  const randomOpacity3 = getRandomOpacity();

  const randomGradientType = Math.random() >= 0.7 ? "linear" : Math.random() >= 0.4 ? "radial" : "conic";

  color1Input.value = randomColor1;
  color2Input.value = randomColor2;
  color3Input.value = randomColor3;
  opacity1Input.value = randomOpacity1;
  opacity2Input.value = randomOpacity2;
  opacity3Input.value = randomOpacity3;
  gradientTypeInput.value = randomGradientType;

  updateGradient();
});






// function to manage rgba values
function rgbaMethod(){
  const color1 = color1Input.value;
  const color2 = color2Input.value;
  const color3 = color3Input.value;

  const opacity1 = opacity1Input.value;
  const opacity2 = opacity2Input.value;
  const opacity3 = opacity3Input.value;

  const color1RGBA = `rgba(${hexToRgb(color1).r}, ${hexToRgb(color1).g}, ${
    hexToRgb(color1).b
  }, ${opacity1})`;
  const color2RGBA = `rgba(${hexToRgb(color2).r}, ${hexToRgb(color2).g}, ${
    hexToRgb(color2).b
  }, ${opacity2})`;
  const color3RGBA = `rgba(${hexToRgb(color3).r}, ${hexToRgb(color3).g}, ${
    hexToRgb(color3).b
  }, ${opacity3})`;

  // Save theme preference
  localStorage.setItem("c1", color1);
  localStorage.setItem("c2", color2);
  localStorage.setItem("c3", color3);

    localStorage.setItem("o1", opacity1);
    localStorage.setItem("o2", opacity2);
    localStorage.setItem("o3", opacity3);

    return [color1RGBA, color2RGBA, color3RGBA];
}

// function to manage directions
function directions(){

  const direction = directionInput.value;
  const direction2 = directionInput2.value;
  const direction3 = directionInput3.value;


   localStorage.setItem("direction", direction);
   localStorage.setItem("direction2", direction2);
   localStorage.setItem("direction3", direction3);

  return [direction, direction2, direction3];

}










// Function to update the gradient background and CSS code
function updateGradient() {

  const [color1RGBA, color2RGBA, color3RGBA] = rgbaMethod();
  const [direction, direction2, direction3] = directions();
  const gradientType = gradientTypeInput.value;
  

// if & else gradient type


  directionInput.removeAttribute("hidden");
  directionInput.removeAttribute("style");
  directionInput2.removeAttribute("style");
  directionInput3.removeAttribute("style");
  directionInput2.removeAttribute("hidden");
  directionInput3.removeAttribute("hidden");


  switch(gradientType){
  case "radial" : 
     directionInput.setAttribute("hidden", true);
     directionInput3.setAttribute("hidden", true);
     break;

   case "linear": 
     directionInput2.setAttribute("hidden", true);
      directionInput3.setAttribute("hidden", true);
     break;

   case "conic": 
     directionInput2.setAttribute("style", "display:none;");
     directionInput.setAttribute("style", "display:none;");
   break;
  }





  if (direction === "custom" && gradientType === "radial") {
    customInput.setAttribute("style", "display:none;");
  }else if (direction === "custom") {
    customInput.removeAttribute("style");
  }else {
    customInput.setAttribute("style", "display:none;");
  }
 
  let inputdeg = 0;

  document
    .getElementById("custom-angle")
    .addEventListener("input", function () {
      inputdeg = this.value + "deg";
      console.log(inputdeg);

    });


     if (gradientType === "linear") {
       gradientCSS = `linear-gradient(${
         inputdeg ? inputdeg : direction
       }, ${color1RGBA}, ${color2RGBA}, ${color3RGBA})`;
       console.log(typeof gradientCSS);
     } else if (gradientType === "radial") {
       gradientCSS = `radial-gradient(${direction2}, ${color1RGBA}, ${color2RGBA}, ${color3RGBA})`;
     } else {
       gradientCSS = `conic-gradient(${direction3}, ${color1RGBA}, ${color2RGBA}, ${color3RGBA})`;
     }


  // Apply the gradient to the preview div
  preview.style.background = gradientCSS;

  // Show the generated CSS code in the textarea
  cssOutput.value = `background: ${gradientCSS};`;
  sassOutput.value = 
  `@mixin gradient-bg {
          ${gradientCSS};
    }
  .my-class {
  @include gradient-bg;
}`;

  lessOutput.value = 
  `.gradient-bg() {
      ${gradientCSS};
    }

  .my-class {
  .conic-gradient-bg;
  }`;



  cssOutput.style.background = "None";
  sassOutput.style.background = "None";
  lessOutput.style.background = "None";



 
  localStorage.setItem("gt", gradientType);
 

}

function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
}

// Adding event listeners to inputs
color1Input.addEventListener("input", updateGradient);
color2Input.addEventListener("input", updateGradient);
color3Input.addEventListener("input", updateGradient);
gradientTypeInput.addEventListener("change", updateGradient);
directionInput.addEventListener("change", updateGradient);
directionInput2.addEventListener("change", updateGradient);
directionInput3.addEventListener("change", updateGradient);
opacity1Input.addEventListener("input", updateGradient);
opacity2Input.addEventListener("input", updateGradient);
opacity3Input.addEventListener("input", updateGradient);






//




// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const color1 = localStorage.getItem("c1");
  const color2 = localStorage.getItem("c2");
  const color3 = localStorage.getItem("c3");
  const gradientType = localStorage.getItem("gt");
  const direction = localStorage.getItem("direction");
  const direction2 = localStorage.getItem("direction2");
  const direction3 = localStorage.getItem("direction3");
  const opa1 = localStorage.getItem("o1");
  const opa2 = localStorage.getItem("o2");
  const opa3 = localStorage.getItem("o3");
   
if(color1 && color2 && color3 && gradientType && direction){

    color1Input.value = color1;
    color2Input.value = color2;
    color3Input.value = color3;
    gradientTypeInput.value = gradientType;
    directionInput.value = direction;
    directionInput2.value = direction2;
    directionInput3.value = direction3;
    opacity1Input.value= opa1;
    opacity2Input.value= opa2;
    opacity3Input.value= opa3;


    updateGradient();

}else {
  
    updateGradient();
}

});


// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 350) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}



function laidBackPreview() {
  
  document.documentElement.scrollTop = 600;
}

function iphoneBackPreview() {
  document.documentElement.scrollTop = 1160;
}

function ipadBackPreview() {
  document.documentElement.scrollTop = 1250;
}





randomButton2.addEventListener("click", () => {
  const randomColor1 = getRandomColor();
  const randomColor2 = getRandomColor();
  const randomColor3 = getRandomColor();
  const randomOpacity1 = getRandomOpacity();
  const randomOpacity2 = getRandomOpacity();
  const randomOpacity3 = getRandomOpacity();

  const randomGradientType =
    Math.random() >= 0.7 ? "linear" : Math.random() >= 0.4 ? "radial" : "conic";

  color1Input.value = randomColor1;
  color2Input.value = randomColor2;
  color3Input.value = randomColor3;
  opacity1Input.value = randomOpacity1;
  opacity2Input.value = randomOpacity2;
  opacity3Input.value = randomOpacity3;
  gradientTypeInput.value = randomGradientType;

  updateiphone(0);
});



randomButton3.addEventListener("click", () => {
  const randomColor1 = getRandomColor();
  const randomColor2 = getRandomColor();
  const randomColor3 = getRandomColor();
  const randomOpacity1 = getRandomOpacity();
  const randomOpacity2 = getRandomOpacity();
  const randomOpacity3 = getRandomOpacity();

  const randomGradientType =
    Math.random() >= 0.7 ? "linear" : Math.random() >= 0.4 ? "radial" : "conic";

  color1Input.value = randomColor1;
  color2Input.value = randomColor2;
  color3Input.value = randomColor3;
  opacity1Input.value = randomOpacity1;
  opacity2Input.value = randomOpacity2;
  opacity3Input.value = randomOpacity3;
  gradientTypeInput.value = randomGradientType;

  updateiphone(1);
});


const supercloseButton = document.getElementById('supercloseButton');
supercloseButton.addEventListener('click',function(){
    document.documentElement.scrollTop = 0;
})


const supercloseButton2 = document.getElementById("supercloseButton2");
supercloseButton2.addEventListener("click", function () {
  document.documentElement.scrollTop = 0;
});






function updateiphone(val){
 const [color1RGBA, color2RGBA, color3RGBA] = rgbaMethod();
  const [direction, direction2, direction3] = directions();
  const gradientType = gradientTypeInput.value;
  

// if & else gradient type


  directionInput.removeAttribute("hidden");
  directionInput.removeAttribute("style");
  directionInput2.removeAttribute("style");
  directionInput3.removeAttribute("style");
  directionInput2.removeAttribute("hidden");
  directionInput3.removeAttribute("hidden");


  switch(gradientType){
  case "radial" : 
     directionInput.setAttribute("hidden", true);
     directionInput3.setAttribute("hidden", true);
     break;

   case "linear": 
     directionInput2.setAttribute("hidden", true);
      directionInput3.setAttribute("hidden", true);
     break;

   case "conic": 
     directionInput2.setAttribute("style", "display:none;");
     directionInput.setAttribute("style", "display:none;");
   break;
  }





  if (direction === "custom" && gradientType === "radial") {
    customInput.setAttribute("style", "display:none;");
  }else if (direction === "custom") {
    customInput.removeAttribute("style");
  }else {
    customInput.setAttribute("style", "display:none;");
  }
 
  let inputdeg = 0;

  document
    .getElementById("custom-angle")
    .addEventListener("input", function () {
      inputdeg = this.value + "deg";
      console.log(inputdeg);

    });


     if (gradientType === "linear") {
       gradientCSS = `linear-gradient(${
         inputdeg ? inputdeg : direction
       }, ${color1RGBA}, ${color2RGBA}, ${color3RGBA})`;
       console.log(typeof gradientCSS);
     } else if (gradientType === "radial") {
       gradientCSS = `radial-gradient(${direction2}, ${color1RGBA}, ${color2RGBA}, ${color3RGBA})`;
     } else {
       gradientCSS = `conic-gradient(${direction3}, ${color1RGBA}, ${color2RGBA}, ${color3RGBA})`;
     }

  if (val === 0){
    // Apply the gradient to the preview div
    gradientBlock.style.background = gradientCSS;
  }
  else {
    gradientBlockIpad.style.background = gradientCSS;
  }

 



 



 

 
}






// Initialize the gradient on page load
// updateGradient();

