import { Types } from "mongoose"
import {IsDateString, IsNotEmpty, IsOptional, ArrayMinSize, IsMongoId, IsString} from 'class-validator'

export class CreatePagoDto {
    


    @IsOptional()
    usuario:Types.ObjectId
    @IsNotEmpty()
    @IsMongoId({each:true, message:'Pago invalido'})
    idPago:Types.ObjectId[]=[]

    @IsOptional()
    numeroDeCuota:number

    @IsOptional()
    usuarioResponsablePago:Types.ObjectId
   
}
