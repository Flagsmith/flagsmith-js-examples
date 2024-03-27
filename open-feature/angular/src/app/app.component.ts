import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FlagsmithProvider} from '@openfeature/flagsmith';
import {OpenFeature, ProviderEvents} from '@openfeature/web-sdk';
import {NgIf, NgFor, NgForOf} from '@angular/common';

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


  constructor() {
    const { environmentID, handleFlags, handleFlagsError } = this;

    const flagsmithFeatureFlagWebProvider = new FlagsmithProvider({
      environmentID,
      defaultFlags: {
        default_feature: {enabled: true},
        font_size: { enabled: true, value: 12 },
      },
    });
    OpenFeature.addHandler(ProviderEvents.ConfigurationChanged, handleFlags);
    OpenFeature.addHandler(ProviderEvents.Error, handleFlagsError);

    OpenFeature.setProvider(flagsmithFeatureFlagWebProvider); // Attach the provider to OpenFeature
  }

  handleFlags = () => {
    this.loading = false;
    const client = OpenFeature.getClient()
    this.logs = [{
      timestamp: new Date().toTimeString(),
      json_value: JSON.stringify(client.getObjectValue("json_value", {})),
      font_size: client.getNumberValue("font_size", 12),
      off_value: client.getBooleanValue("off_value", false)
    }].concat(this.logs);
    this.identity = OpenFeature.getContext().targetingKey || null;
  }

  handleFlagsError = (details:any) => {
    console.error(details)
  }

  logout = () => {
    OpenFeature.setContext({});
  }

  login = () => {
    OpenFeature.setContext({targetingKey: 'flagsmith_sample_user'});
  }

  submitTrait = () => {
    // OpenFeature.setContext({
    //   targetingKey: 'flagsmith_sample_user',
    //   traits: {
    //     ...(OpenFeature.getContext().traits as any || {}),
    //     example_trait: 'Some value ' + Math.floor(Math.random() * 10) + ''
    //   }
    // });
  }

}
