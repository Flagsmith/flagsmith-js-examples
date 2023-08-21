import { OpenFeature } from "@openfeature/js-sdk";
import FlagsmithProvider from "./flagsmith-provider";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

// Initialize OpenFeature provider
try {
    const environmentKey = process.env.ENVIRONMENTKEY || "";
    if (!environmentKey) {
        throw new Error("Environment key not provided");
    }

    OpenFeature.setProvider(new FlagsmithProvider({
        environmentKey,
        requestTimeoutSeconds: 10
    }));
} catch (err) {
    console.error("Error initializing OpenFeature:", err);
}

const app: Express = express();

app.use(express.json());

interface Body {
    flagKey: string;
    defaultValue: string | number | boolean | object;
    evaluationMethod: "string" | "number" | "boolean" | "object";
}

app.post('/', async (req: Request, res: Response) => {
    try {
        const body: Body = req.body;
        if (!body.flagKey || body.defaultValue === undefined || !body.evaluationMethod) {
            return res.status(400).send("Invalid request body");
        }

        const { flagKey, defaultValue, evaluationMethod } = body;

        let details;

        switch (evaluationMethod) {
            case "string":
                details = await OpenFeature.getClient().getStringDetails(flagKey, defaultValue as string);
                break;
            case "number":
                details = await OpenFeature.getClient().getNumberDetails(flagKey, defaultValue as number);
                break;
            case "boolean":
                details = await OpenFeature.getClient().getBooleanDetails(flagKey, defaultValue as boolean);
                break;
            case "object":
                details = await OpenFeature.getClient().getObjectDetails(flagKey, JSON.stringify(defaultValue));
                break;
            default:
                return res.status(400).send("Invalid evaluation method");
        }

        return res.status(200).send(details);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).send("An error occurred");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Openfeature flagsmith provider demo app is listening on port ${PORT}!`);
});
