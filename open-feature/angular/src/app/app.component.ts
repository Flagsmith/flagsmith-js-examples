import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FlagsmithClientProvider} from '@openfeature/flagsmith-client-provider';
import {OpenFeature, ProviderEvents} from '@openfeature/web-sdk';
import {NgIf, NgFor, NgForOf} from '@angular/common';
import {EventHandler} from "@openfeature/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  logs = [] as any[];
  loading = true;
  environmentID = 'QjgYur4LQTwe5HpvbvhpzK';
  identity = null as string | null;
  buttonClicks = null;
  trait = null;

  flagsmithClientProvider: FlagsmithClientProvider = new FlagsmithClientProvider({
    environmentID: this.environmentID,
    cacheFlags: true,
    defaultFlags: {
      default_feature: {enabled: true},
      font_size: { enabled: true, value: 12 },
    },
  });


  constructor() {
    const { handleFlags, handleFlagsError } = this;

    OpenFeature.addHandler(ProviderEvents.ConfigurationChanged, handleFlags);
    OpenFeature.addHandler(ProviderEvents.Error, handleFlagsError);
    OpenFeature.setProvider(this.flagsmithClientProvider)
    if(OpenFeature.getClient().providerStatus === 'READY') {
      this.handleFlags()
    }
  }

  handleFlags:EventHandler = () => {
    const identity = this.flagsmithClientProvider.flagsmithClient.identity
    this.identity = identity?`${identity}`: null
    this.loading = false;
    const client = OpenFeature.getClient()
    this.logs = [{
      timestamp: new Date().toTimeString(),
      json_value: JSON.stringify(client.getObjectValue("json_value", {})),
      font_size: client.getNumberValue("font_size", 12),
      off_value: client.getBooleanValue("off_value", false),
    }].concat(this.logs);
  }

  handleFlagsError = (details:any) => {
    console.error(details)
  }

  logout = () => {
    OpenFeature.setContext({});
  }

  login = () => {
    const userData = {id:"flagsmith_sample_user", example_trait: 1}
    OpenFeature.setContext({targetingKey: userData.id, traits:{example_trait:userData.example_trait}});
  }

}
