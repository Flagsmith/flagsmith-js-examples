import {FlagsmithClientProvider} from "@openfeature/flagsmith-client-provider";
import flagsmith from "react-native-flagsmith";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default new FlagsmithClientProvider({
    environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
    flagsmithInstance: flagsmith,
    cacheFlags: true,
    AsyncStorage,
})
