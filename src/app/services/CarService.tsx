import axios from "axios";

interface ApiResult {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: [];
}

class CarService {
  private path: string;

  constructor(path: `${string}`) {
    this.path = path;
  }

  public async getAllData(): Promise<ApiResult> {
    return axios
      .get(`${this.path}/vehicles/GetMakesForVehicleType/car?format=json`)
      .then((r) => r.data)
      .catch((e) => {
        return {
          Count: 0,
          Message: e.message ?? "Generic error message",
          SearchCriteria: "",
          Results: [],
        };
      });
  }

  public getVehicleMakes(): Promise<[]> {
    return axios
      .get(`${this.path}/vehicles/GetMakesForVehicleType/car?format=json`)
      .then((r) => {
        return r.data.Results.map((v) => {
          return {
            name: v.MakeName,
            id: v.MakeId,
          };
        });
      })
      .catch((e) => {
        return {
          Count: 0,
          Message: e.message ?? "Generic error message",
          SearchCriteria: "",
          Results: [],
        };
      });
  }
}

export default new CarService("https://vpic.nhtsa.dot.gov/api");
