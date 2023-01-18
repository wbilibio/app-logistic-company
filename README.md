<a name="readme-top"></a>
<div align="center">
  <h2 align="center">App Logistic Company</h2>
</div><br>

### Access for Front-end repository in AngularJS 

[![Repository](https://img.shields.io/badge/Node-Frontend-339933?style=for-the-badge&logo=nodedojs&logoColor=white)](https://github.com/wbilibio/app-logistic-company-api)

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

Follow the instructions to run the API correctly:

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/wbilibio/app-logistic-company.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Duplicate /shared/@env/environment.local.example.ts to /shared/@env/environment.local.ts 

   ```js
   const environment.logistic_api = 'ENTER YOUR API';
   ```
4. Run local
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
