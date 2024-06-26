import { Controller, Get, Post, Body, Param, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';

import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { tokenAutenticacionGuard } from 'src/autenticacion/guards/token.autenticacion.guard';
import { RolAutenticacionGuard } from 'src/autenticacion/guards/rol.autenticacion.guard';
import { Rol } from 'src/autenticacion/enums/autenticacion.enum';
import { Roles } from 'src/autenticacion/decorators/roles.decorators';
import { Cuota } from 'src/cuotas/schemas/cuota.schema';


@ApiTags('pagos')
@UseGuards(tokenAutenticacionGuard, RolAutenticacionGuard)
@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}


  @Roles([Rol.Admin, Rol.cliente])
  @Post('create/:idcuota')
  async createPago(@Body() createPagoDto: CreatePagoDto,@Param('idcuota') Cuota:string,  @Req() request:Request<Express.Application>) {
   try { 
     createPagoDto.cuota= new Types.ObjectId(Cuota)
     createPagoDto.usuarioResponsablePago= request['idUsuario']
    return await this.pagosService.createPago(createPagoDto);
   } catch (error) {     
      throw new NotFoundException(error.message)    
   }
  }
  @Roles([Rol.Admin, Rol.cliente])
  @Get('listar/:idcuota')
  findAllPagadosCliente(@Param('idcuota') cuota:string) {    
    return this.pagosService.findAllPagadosCliente(cuota);
  }
  @Roles([Rol.Admin, Rol.cliente])
  @Get('listar/mes/:idcuota')
  listarPagosClientePorMes(@Param('idcuota') cuota:Types.ObjectId){
    return this.pagosService.listarPagosClientePorMes(cuota)
  }
  
}
