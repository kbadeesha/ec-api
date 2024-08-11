import { CustomRepository } from "../../typeorm-ex/decorators";
import { BaseRepository } from "src/core/entity";
import { Verification } from "../entities";
import { IVerificationRepository } from "../interfaces/repositories/verification.repository.interface";

// noinspection JSUnusedGlobalSymbols
export const userRelations = ["user"];

@CustomRepository(Verification)
export class VerificationRepository extends BaseRepository<Verification> implements IVerificationRepository {}
