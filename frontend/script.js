// frontend/script.js

const API_BASE_URL = "http://127.0.0.1:8000";
const API_KEY = "AlzaSykkPOauWPCS0zYen3-T3_WtB0AqDtjxMmQ";
let panorama;

// Ensure feedback section is hidden initially
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("feedback").style.display = "none";
});

// Function to initialize Google Maps
function initMap() {
    console.log("Google Maps API loaded successfully.");
}

// Function to load Google Maps 360° Panorama after login
async function loadHotspots() {
    console.log("Loading Hotspots...");

    try {
        const response = await fetch(`${API_BASE_URL}/tour/hotspots/`);
        const hotspots = await response.json();
        console.log("Hotspots Data:", hotspots);

        if (hotspots.length > 0) {
            const firstHotspot = hotspots[0];

            if (typeof google === "undefined") {
                console.error("Google Maps API is not loaded!");
                alert("Error: Google Maps API failed to load.");
                return;
            }

            // Load Google Maps 360° Street View
            panorama = new google.maps.StreetViewPanorama(
                document.getElementById("map"),
                {
                    position: { lat: firstHotspot.latitude, lng: firstHotspot.longitude },
                    pov: { heading: 165, pitch: 0 },
                    zoom: 1,
                }
            );

            // Show feedback section when user interacts with the tour
            panorama.addListener("position_changed", function () {
                document.getElementById("feedback").style.display = "block";
            });

        } else {
            console.error("No hotspots found!");
            alert("No tour locations found.");
        }
    } catch (error) {
        console.error("Error loading hotspots:", error);
        alert("Error loading virtual tour.");
    }
}

// User login function
async function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: Unable to login`);
        }

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            document.getElementById("login-popup").style.display = "none";
            alert("Login successful!");

            // Load the virtual tour after successful login
            setTimeout(() => {
                loadHotspots();
            }, 1000);
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Error logging in. Please check the console.");
    }
}

// Submit feedback function
async function submitFeedback() {
    let text = document.getElementById("feedback-text").value;
    let token = localStorage.getItem("token");

    if (!token) {
        alert("You need to be logged in to submit feedback.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/tour/feedback/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ comment: text }),
        });

        if (response.ok) {
            alert("Feedback submitted successfully!");
            document.getElementById("feedback-text").value = ""; // Clear input field
        } else {
            alert("Error submitting feedback. Please try again.");
        }
    } catch (error) {
        console.error("Feedback submission error:", error);
        alert("Error submitting feedback.");
    }
}

// Ensure login popup appears first before accessing the tour
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    if (!token) {
        document.getElementById("login-popup").style.display = "block";
    } else {
        document.getElementById("login-popup").style.display = "none";
        setTimeout(() => {
            loadHotspots();
        }, 1000);
    }
});
