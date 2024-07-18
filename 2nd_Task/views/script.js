// Get the query parameters from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Extract tailor details from the query parameters
const tailorData = {
    title: urlParams.get('title'),
    description: urlParams.get('description'),
    email: urlParams.get('email'),
};

// Function to populate tailor details in the grid
function populateTailorDetails(data) {
    const tailorDetailsContainer = document.getElementById("tailorDetails");

    // Create a grid for tailor details
    const gridHtml = `
        <div class="col-md-6">
            <h4>Details</h4>
            <table class="table">
                <tbody>
                    <tr>
                        <th>Title:</th>
                        <td>${data.title}</td>
                    </tr>
                    <tr>
                        <th>Description:</th>
                        <td>${data.description}</td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>${data.email}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // Insert the grid HTML into the container
    tailorDetailsContainer.innerHTML = gridHtml;
}

// Populate the tailor details
populateTailorDetails(tailorData);
