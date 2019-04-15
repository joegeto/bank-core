import { check } from "../helpers/check";
import { responseSuccess } from "../helpers/responseSuccess";
import { Parsing } from "rusane";
import { validateStringLength } from "rusane/dist/validation";
import jwt from "jsonwebtoken";
import { jwtconfig } from "@/configs/jwtconfig";
import Router from "koa-router";

const r = new Router({
    prefix: "/api/v1/access",
});

// TODO [RM]: swagger
r.post("/token", async ctx => {
    // TODO [RM]: rate limiting, captcha, smth?

    const email = check(
        ctx.request.body,
        "email",
        Parsing.parseString,
        validateStringLength({ minLength: 1, maxLength: 256 })
    );
    const password = check(
        ctx.request.body,
        "password",
        Parsing.parseString,
        validateStringLength({ minLength: 1, maxLength: 256 })
    );

    // TODO [RM]: TEST, TEMP only - add real user/account check later
    // TODO [RM]: audit logs

    const token = jwt.sign({}, jwtconfig.privateKey, {
        algorithm: "RS256",
        expiresIn: jwtconfig.expiresIn,
        subject: email, // TODO [RM]: naive for now, TEST only
    });

    ctx.body = responseSuccess({
        token: token,
    });
});

export default r;