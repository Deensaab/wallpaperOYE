

document.addEventListener("DOMContentLoaded", function () {
    const wallpaperGallery = document.getElementById("wallpaper-gallery");
    const searchBar = document.getElementById("search-bar");

    const allWallpapersBtn = document.getElementById("all-wallpapers-btn");
    const mobileWallpapersBtn = document.getElementById("mobile-wallpapers-btn");
    const computerWallpapersBtn = document.getElementById("computer-wallpapers-btn");

    const wallpapers = [
      
        { src: "wallpapers/desktop-wallpaper-car-synthwave-synthwave-car-thumbnail.jpg", tags: ["cars", "abstract"], type: "mobile" },
        { src: "wallpapers/Firefly supra car, midnight city, 4k, unreal engine5,16-9 10655.jpg", tags: ["cars", "abstract"], type: "computer"},
        { src: "wallpapers/Firefly cars, minimal, 2k, white background 10332.jpg", tags: ["cars", "abstract"], type: "computer"},
          { src: "wallpapers/Firefly chinese village, lush mountain, sunset, ninja above temple watching sunset 86522 (1).jpg", tags: ["nature", "abstract"], type: "computer"},
          { src: "wallpapers/Firefly deer has jungle on her backbone, minimal, white background 60757.jpg", tags: ["nature"], type: "computer"},
          { src: "wallpapers/Firefly man standing on mountain, watching at big water fall 25041.jpg", tags: ["nature",], type: "computer"},
          { src: "wallpapers/Firefly man standing on mountain, watching at lush green village ,sunset ,4k , hyperrealstic 86522.jpg", tags: ["nature", "abstract"], type: "computer"},
          { src: "wallpapers/Firefly purple sunset in pond, high snow covered mountain style of a video games 21675.jpg", tags: ["nature", "fantasy"], type: "computer"},


        // Add more wallpapers with their respective tags and type
    ];

    function displayWallpapers(wallpaperType, searchTerm, selectedTags) {
        wallpaperGallery.innerHTML = "";

        wallpapers.forEach(wallpaper => {
            const tagsMatch = selectedTags.length === 0 || wallpaper.tags.some(tag => selectedTags.includes(tag));
            const typeMatch = wallpaperType === "all" || wallpaper.type === wallpaperType;
            const searchTermMatch = searchTerm === '' || wallpaper.tags.some(tag => tag.includes(searchTerm));

            if (tagsMatch && typeMatch && searchTermMatch) {
                const wallpaperElement = document.createElement("img");
                wallpaperElement.src = wallpaper.src;
                wallpaperElement.alt = "Wallpaper";
                wallpaperElement.classList.add("wallpaper");

                const wallpaperContainer = document.createElement("div");
                wallpaperContainer.classList.add("wallpaper-container");
                wallpaperContainer.appendChild(wallpaperElement);

                wallpaperGallery.appendChild(wallpaperContainer);
                  wallpaperElement.addEventListener("click", function() {
                    // Redirect to the wallpaper.html page with the selected wallpaper
                    window.location.href = "wallpaper.html?src=" + encodeURIComponent(wallpaper.src);
                });
            }
        });
    }

    allWallpapersBtn.addEventListener("click", function () {
        searchBar.value = ''; // Clear the search bar
        const selectedTags = Array.from(document.querySelectorAll("#tag-filter-container input[type=checkbox]:checked")).map(tag => tag.value);
        displayWallpapers("all", '', selectedTags);
    });

    mobileWallpapersBtn.addEventListener("click", function () {
        searchBar.value = ''; // Clear the search bar
        const selectedTags = Array.from(document.querySelectorAll("#tag-filter-container input[type=checkbox]:checked")).map(tag => tag.value);
        displayWallpapers("mobile", '', selectedTags);
    });

    computerWallpapersBtn.addEventListener("click", function () {
        searchBar.value = ''; // Clear the search bar
        const selectedTags = Array.from(document.querySelectorAll("#tag-filter-container input[type=checkbox]:checked")).map(tag => tag.value);
        displayWallpapers("computer", '', selectedTags);
    });

    searchBar.addEventListener("input", function () {
        const selectedType = document.querySelector("#button-container button.active");
        const wallpaperType = selectedType ? selectedType.id.replace("-btn", "") : "all";
        const selectedTags = Array.from(document.querySelectorAll("#tag-filter-container input[type=checkbox]:checked")).map(tag => tag.value);
        displayWallpapers(wallpaperType, searchBar.value.toLowerCase(), selectedTags);
    });

    // Tag checkboxes event listener
    const tagCheckboxes = document.querySelectorAll("#tag-filter-container input[type=checkbox]");
    tagCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const selectedType = document.querySelector("#button-container button.active");
            const wallpaperType = selectedType ? selectedType.id.replace("-btn", "") : "all";
            const selectedTags = Array.from(document.querySelectorAll("#tag-filter-container input[type=checkbox]:checked")).map(tag => tag.value);
            displayWallpapers(wallpaperType, searchBar.value.toLowerCase(), selectedTags);
        });
    });

    // Helper function to toggle active class on buttons
    function toggleActiveClass(selectedBtn) {
        const buttons = document.querySelectorAll("#button-container button");
        buttons.forEach(btn => btn.classList.remove("active"));
        selectedBtn.classList.add("active");
    }

    // Display all wallpapers by default
    displayWallpapers("all", '', []);
});
