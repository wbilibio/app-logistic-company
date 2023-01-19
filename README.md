<a name="readme-top"></a>
<div align="center">
  <h2 align="center">App Logistic Company</h2>
</div><br>

### Access Node API repository 

[![Repository](https://img.shields.io/badge/Node-Backend-339933?style=for-the-badge&logo=nodedojs&logoColor=white)](https://github.com/wbilibio/app-logistic-company-api)

### About The Project

Application that performs the manage storage, inventory and transportation(shipments) of the packages. 
It is possible to create storage locations with package limits and then create packages and relate them in these storages.

FRONT-END:
* User-friendly interfaces.
* Creating Google components (Autocomplete and Render Map Directions).
* Responsive version.
* Controllers, Services to connect on API.
* CRUD.
* Table sorting and pagination 
* Front-end error handling

### Built With

The main technologies used on Front-end are listed below:

* [![Angular][Angular.io]][Angular-url]
* [![RxJS][RxJS.io]][RxJS-url]
* [![SASS][SASS.io]][SASS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Follow the instructions to run the APP correctly:

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/wbilibio/app-logistic-company.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. To install the Angular CLI run
   ```sh
   npm install -g @angular/cli
   ```
More information about how to install angular <a href="https://angular.io/guide/setup-local">click here</a>

4. Duplicate /shared/@env/environment.local.example.ts to /shared/@env/environment.local.ts 

5. Generate Google Maps API Key.
   - Logged in Google account and create project on <a href="https://console.cloud.google.com/google/maps-apis/overview">Google Cloud</a>.
   - Activate these three APIs: Directions API, Maps JavaScript API, Places API 
   - At the end of the process, an api key is generated: Maps API Key. The key can be found in the "credentials" menu.
   - Add key on environment.local.ts
   ```js
    const environment.keys.google_maps = 'ENTER YOUR API KEY';
   ```
6. Configure API url 

   ```js
    const environment.logistic_api = 'ENTER YOUR URL API';
   ```   

7. Run local
   ```sh
   ng serve --configuration=local
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>


[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[RxJS.io]: https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white
[RxJS-url]: https://rxjs.dev/
[SASS.io]: https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white
[SASS-url]: https://sass-lang.com
