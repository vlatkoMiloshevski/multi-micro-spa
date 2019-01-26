import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { User } from '../models/user.model';

const STORAGE_PREFIX = 'hdx.local';

@Injectable()
export class SharedStorageService implements StorageService {

  private storageKeys = {
    allCampaignFields: 'allCampaignFields',
    userKey: 'auth.user'
  };

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
  }

  private getStorageKey(key: string) {
    return STORAGE_PREFIX + '.' + key;
  }

  private getUserCampaigKey(): string {
    const user: User = this.getUser();
    return this.storageKeys.allCampaignFields + '.' + (user ? user.id : '0');
  }

  public getAllCampaignFieldList(): number {
    const allCampaignFields = this.get(this.getUserCampaigKey()) || {};
    return allCampaignFields;
  }

  public setAllCampaignFieldList(allCampaignFields): void {
    this.set(this.getUserCampaigKey(), allCampaignFields);
  }

  public getUser(): User {
    return <User> this.get(this.storageKeys.userKey);
  }

  public setUser(user: User): void {
    this.set(this.storageKeys.userKey, user);
  }

  public removeUser(): void {
    this.remove(this.storageKeys.userKey);
  }


  public get(key: string): any {
    return this.storage.get(this.getStorageKey(key));
  }

  public set(key: string, value: any): void {
    this.storage.set(this.getStorageKey(key), value);
  }
  public remove(key: string): void {
    this.storage.remove(this.getStorageKey(key));
  }

}
