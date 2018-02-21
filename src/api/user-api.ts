import {
  Routable,
  Route,
  SakuraApi,
  SapiRoutableMixin
} from '@sakuraapi/api';
import {
  NextFunction,
  Request,
  Response
} from 'express';

import{ User } from '../models/user'
import { cache } from 'ejs';

export { SakuraApi };

@Routable({
  baseUrl:'users',
  model: User,
  suppressApi:true
})
export class UserApi extends SapiRoutableMixin() {

  @Route({
    method:'get',
    path:':id'
  })
  async getUser(req: Request, res: Response, next: NextFunction) {
    console.log('req',req.params);
    let user;
    try{
      user = await User.getById(req.params.id);
    }
    catch(err){
      user ={ message:err.message };
    }
    res.send(user).status(200)
    next();
  };

  @Route({
    method:'post',
    path:'/save'
  })
  async sendUsers(req: Request, res: Response, next: NextFunction) {
    console.log('req',req.body);
    const user = User.fromJson(req.body);
    let saveUser;
    try{
      saveUser = await user.create()
    }catch(err){
      saveUser ={ message:err.message };
    }
    res.send(saveUser).status(200)
  }

  @Route({
    method:'get',
    path:''
  })
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    console.log('req',req.params);
    let user;
    try{
      user = await User.get({filter: {}});
    }
    catch(err){
      user ={ message:err.message };
    }
    res.send(user).status(200)
    next();
  };

  @Route({
    method:'put',
    path:':id'
  })
  async updateUser(req: Request, res: Response, next: NextFunction) {
    req.body.id = req.params.id;
    console.log('req body update',req.body);
    let user = User.fromJson(req.body)
    let updateU;
    try{
      updateU = await user.save();
    }
    catch(err){
      updateU ={ message:err.message };
    }
    res.send(updateU).status(200)
    next();
  };

  @Route({
    method:'delete',
    path:':id'
  })
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    let updateU;
    try{
      updateU = await User.removeById(req.params.id);
    }
    catch(err){
      updateU ={ message:err.message };
    }
    res.send(updateU).status(200)
    next();
  };
}
