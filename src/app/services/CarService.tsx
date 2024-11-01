import axios from 'axios';
import { Models } from '../result/[makeId]/[year]/Results';

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
      .then(r => r.data)
      .catch(e => {
        return {
          Count: 0,
          Message: e.message ?? 'Generic error message',
          SearchCriteria: '',
          Results: [],
        };
      });
  }

  public getVehicleMakes(): Promise<[]> {
    return axios
      .get(`${this.path}/vehicles/GetMakesForVehicleType/car?format=json`)
      .then(r => {
        return r.data.Results.map(v => {
          return {
            name: v.MakeName,
            id: v.MakeId,
          };
        });
      })
      .catch(e => {
        return {
          Count: 0,
          Message: e.message ?? 'Generic error message',
          SearchCriteria: '',
          Results: [],
        };
      });
  }

  public getVehicleData(makeId: string, year: string): Promise<Models[]> {
    return axios
      .get(
        `${this.path}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
      )
      .then(r => {
        return r.data.Results.map(v => {
          return {
            makeId: v.Make_ID,
            makeName: v.Make_Name,
            modelId: v.Model_ID,
            modelName: v.Model_Name,
          };
        });
      })
      .catch(e => {
        return {
          Count: 0,
          Message: e.message ?? 'Generic error message',
          SearchCriteria: '',
          Results: [],
        };
      });
  }
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) {
  throw new Error('API URL is not defined in environment variables.');
}

export default new CarService(apiUrl);
