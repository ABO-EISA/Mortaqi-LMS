//................SCROLL TO TOP
let up = document.querySelector(".up");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    up.classList.add("show");
  } else {
    up.classList.remove("show");
  }
});

up.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
//........................ADD ACTIVE CLASS TO SELECTED ITEM
let chosen = document.querySelectorAll("nav .heder-options li ");
chosen.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.currentTarget.parentElement.querySelectorAll(".active").forEach((ele) => {
      ele.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  });
});
//-----------------------ACTIVE SECTION WHILE SCROLLING
const navLinks = document.querySelectorAll("nav .heder-options li a");
const sections = document.querySelectorAll("section[id], header[id]");

const observerOptions = {
  root: null,
  rootMargin: "-20% 0px -70% 0px",
  threshold: 0,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const currentId = entry.target.getAttribute("id");
      const matchingLink = document.querySelector(
        `nav .heder-options li a[href="#${currentId}"]`,
      );
      navLinks.forEach((link) => {
        link.parentElement.classList.remove("active");

        if (matchingLink) {
          if (entry.isIntersecting) {
            // لما يدخل السكشن: يتأكتف اللينك بتاعه
            matchingLink.parentElement.classList.add("active");
          } else {
            // أول ما يخرج من السكشن: يتشال الاكتيف فوراً!
            matchingLink.parentElement.classList.remove("active");
          }
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
});
window.addEventListener("scroll", () => {
  if (window.scrollY < 600) {
    navLinks.forEach((link) => link.parentElement.classList.remove("active"));
  }
});
//------------------------TOGGLE FORMT
document.querySelector(".toggle").onclick = function () {
  this.querySelector(".setting-icon").classList.toggle("fa-spin");
  //toggle class open to open and close the setting menu
  document.querySelector(".setting").classList.toggle("open");
};
//                             CHANGE THEME
//[1] apply  theme on html element and li element and save it in local storage
let theme = document.querySelectorAll(".color-list li");
theme.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color,
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});
// [2] get themes from local storage and apply it on html element and li element
let themecolor = localStorage.getItem("color-option");
if (themecolor != null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color-option"),
  );
  document.querySelectorAll(".color-list li").forEach((ele) => {
    ele.classList.remove("active");
    if (ele.dataset.color === themecolor) {
      ele.classList.add("active");
    }
  });
}
//                             CHANGE BACHGROUND option

let bg_option = true;
let intervalclear;
//[1] aplly back-ground change option on main-page and (on/off) button and save the option in local storage
let btnOptin = localStorage.getItem("on/off");
let btn = document.querySelectorAll(".option button");
btn.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
    localStorage.setItem("on/off", e.target.dataset.bg_option);
    bg_color_option(e.target.dataset.bg_option);
    // if (e.target.dataset.bg_option === "on") {
    //   bg_option = true;
    //   bgOption();
    // } else {
    //   bg_option = false;
    //   clearInterval(intervalclear);
    // }
  });
});
//[2] get saved option from L.S and apply it on reload
if (btnOptin != null) {
  btn.forEach((button) => {
    button.classList.remove("active");
    if (button.dataset.bg_option === btnOptin) {
      button.classList.add("active");
    }
  });
  bg_color_option(btnOptin);
  // if (btnOptin === "on") {
  //   bg_option = true;
  //   bgOption();
  // } else {
  //   bg_option = false;
  //   clearInterval(intervalclear);
  // }
} else {
  bgOption();
}
// changing background of main page if on
let heroSection = document.querySelector(".main-page");
let arrOfBackgrounds = [
  "imgs/random/0.png",
  "imgs/random/1.png",
  "imgs/random/2.png",
  "imgs/random/3.png",
];
let currentImg = 0;
function bgOption() {
  clearInterval(intervalclear);
  if (bg_option === true) {
    intervalclear = setInterval(() => {
      currentImg = (currentImg + 1) % arrOfBackgrounds.length;
      heroSection.style.backgroundImage = `url("${arrOfBackgrounds[currentImg]}")`;
    }, 3000);
  }
}
function bg_color_option(option) {
  if (option === "on") {
    bg_option = true;
    bgOption();
  } else {
    bg_option = false;
    clearInterval(intervalclear);
  }
}
//...................................PLATTFORM
// modern method to find either element appeared or not with IntersectionObserver
let courses = document.querySelectorAll("#Plattform .course");
let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let span = entry.target.querySelector("span.progress");
        let number = entry.target.querySelector("span.ratio");
        let target = parseInt(span.dataset.progress);
        span.style.setProperty("--p", span.dataset.progress);
        observer.unobserve(entry.target);
        let current = 0;
        let counter = setInterval(() => {
          current++;
          number.textContent = `${current}%`;
          if (current >= target) {
            clearInterval(counter);
          }
        }, 10);
      }
    });
  },
  {
    threshold: 0.8,
  },
);
courses.forEach((course) => observer.observe(course));

//                             SERVICE ANIMATION

let services = document.querySelectorAll("#Services .card");
let obs2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.8 },
);
services.forEach((card) => {
  obs2.observe(card);
});
//                             CONTACT LOGIC
//[1] when user fill contact form the following happens:-
// 1) check that all data is right
// 2) sent data of user to Google Sheet
// 3) all users has only 2 tries to contact without sign up
// 4) the msg sent to a formail email of Mortaqi support team

// 1- }heck that all data is right
let contactForm = document.querySelector("#contact-form");
let fullName = document.querySelector("#full-name");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let msg = document.querySelector("#msg");

let nameRegex = /^[a-zA-Z\s]+$/;
let phoneRegex = /^\+201[0125][0-9]{8}$/;
// use setCustomValidity("") to show msg like required msg
fullName.addEventListener("input", () => {
  // First state if user don't enter any this ==> reqired in html will work
  if (fullName.value.trim() === "") {
    fullName.setCustomValidity("");
  }
  // Second state if user enters invalid name
  else if (!nameRegex.test(fullName.value.trim())) {
    fullName.setCustomValidity("Please enter a valid name");
  }
  // to prevent setCustomValidity("") from work after refactoring name
  else {
    fullName.setCustomValidity("");
  }
});

phone.addEventListener("input", () => {
  if (phone.value.trim() === "") {
    phone.setCustomValidity("");
  } else if (!phoneRegex.test(phone.value.trim())) {
    phone.setCustomValidity("Please enter a valid phone number");
  } else {
    phone.setCustomValidity("");
  }
});

// 2) sent data of user to Google Sheet
let contactAttempts = Number(localStorage.getItem("contactAttempts")) || 0;
contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  // Check attempts
  if (contactAttempts >= 2) {
    alert(
      "You have reached the maximum number of messages. Please sign up to send more.",
    );
    return;
  }
  // Collect form data
  const data = {
    name: fullName.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    message: msg.value.trim(),
  };
  // Convert Object to JSON
  const jsonData = JSON.stringify(data);
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzd8JxV3BaWGmupAw0dK31E8eEd4C-8PKHNtwtU1FHNL7dzmW8bL5OrW6PF1py6DPGh8Q/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: jsonData,
      },
    );
    console.log(response.ok);
    if (response.ok) {
      contactAttempts++;
      localStorage.setItem("contactAttempts", contactAttempts);

      alert("Your message was sent successfully.");
      contactForm.reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    alert(
      "Unable to send your message. Please check your internet connection and try again.",
    );
  }
});
