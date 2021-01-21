import http from './axios'


/* 后台管理接口集合 */

/* --------------菜单列表----------------- */
/* 菜单列表接口 istree是可选参数,返回树级结构*/
export function getMenuList () {
  return http.get('/api/menulist?istree=true')
}
/* 菜单接口 data={pad:...}*/
export function addMenu (data) {
  return http.post('/api/menuadd', data)
}

/* 删除接口 */
export function deleteMenu (data) {
  return http.post('/api/menudelete', data)
}

/* 获取菜单（一条） */
export function menuInfo (params) {
  return http.get('/api/menuinfo', {
    params
  })
}

/* 菜单修改 */
export function menuEdit (data) {
  return http.post('/api/menuedit', data)
}

/* ------------------角色列表------------------- */
/* 封装角色列表接口 */
export function getRoleList(){
    return http.get('/api/rolelist')
}

/* 封装添加角色接口  */
export function addRole(data){
    return http.post('/api/roleadd',data)
}

/* 封装角色列表删除接口 */
export function deleteRole(data){
    return http.post('/api/roledelete',data)
}

/* 封装角色列表获取一条数据接口 */
export function roleInfo(params){
    return http.get('/api/roleinfo',{
        params
    })
}

/* 封装角色列表编辑接口 */
export function editRole(data){
    return http.post('/api/roleedit',data)
}

/* ------------------管理员列表------------------- */

/* 封装管理员列表接口 必须要传递分页参数 */
export function getManagerList(params){
    return http.get('/api/userlist',{
        params
    })
}

/* 封装添加管理员接口  */
export function addManager(data){
    return http.post('/api/useradd',data)
}

/* 封装管理员列表删除接口Manger */
export function deleteManager(data){
    return http.post('/api/userdelete',data)
}

/* 封装管理员列表获取一条数据接口 */
export function managerInfo(params){
    return http.get('/api/userinfo',{
        params
    })
}

/* 封装管理员列表编辑接口 */
export function editManager(data){
    return http.post('/api/useredit',data)
}

/* 封装管理员总条数 */
export function getManagerCount(){
    return http.get('/api/usercount')
}

/* 用户登录接口 */
export function userLogin(data){
    return http.post('/api/userlogin',data)
}

/* -------------------分类管理接口------------------ */
//封装分类添加接口
export function getSortAdd(data){
    return http.post('/api/cateadd',data)
}
//封装分类列表接口
export function getSortList(){
    return http.get('/api/catelist',{
        params:{
            istree:true
        }
    })
}
//封装分类获取（一条）接口
export function getSortInfo(params){
    return http.get('/api/cateinfo',{
        params
    })
}
//封装分类修改接口
export function getSortEdit(data){
    return http.post('/api/cateedit',data)
}
//封装分类删除接口
export function getSortDelete(data){
    return http.post('/api/catedelete',data)
}

/* ------------------商品规格管理接口----------------*/
//商品规格添加
export function getSpecsAdd(data){
    return http.post('/api/specsadd',data)
}
//商品规格列表
export function getSpecsList(params){
    return http.get('/api/specslist',{
        params
    })
}
//商品规格获取（一条）
export function getSpecsInfo(params){
    return http.get('/api/specsinfo',{
        params
    })
}
//商品规格修改
export function getSpecsEdit(data){
    return http.post('/api/specsedit',data)
}
//商品规格删除
export function getSpecsDelete(data){
    return http.post('/api/specsdelete',data)
}
//商品规格总数（用于计算分页)
export function getSpecsCount(){
    return http.get('/api/specscount')
}

/* 商品管理接口 */
//商品管理添加
export function getGoodsAdd(data){
    return http.post('/api/goodsadd',data)
}
//商品管理列表
export function getGoodsList(params){
    return http.get('/api/goodslist',{
        params
    })
}
//商品管理获取（一条）
export function getGoodsInfo(params){
    return http.get('/api/goodsinfo',{
        params
    })
}
//商品管理修改
export function getGoodsEdit(data){
    return http.post('/api/goodsedit',data)
}
//商品管理删除
export function getGoodsDelete(data){
    return http.post('/api/goodsdelete',data)
}
//商品管理总数（用于计算分页)
export function getGoodsCount(){
    return http.get('/api/goodscount')
}

// 封装会员管理接口
//封装会员管理列表接口
export function getMemberList(){
    return http.get('/api/memberlist')
}
//封装会员管理获取（一条）接口
export function getMemberInfo(params){
    return http.get('/api/memberinfo',{
        params
    })
}
//封装会员管理修改接口
export function getMemberEdit(data){
    return http.post('/api/memberedit',data)
}

/* 轮播图管理接口 */
//封装轮播图添加接口
export function getBannerAdd(data){
    return http.post('/api/banneradd',data)
}
//封装轮播图列表接口
export function getBannerList(){
    return http.get('/api/bannerlist')
}
//封装轮播图获取（一条）接口
export function getBannerInfo(params){
    return http.get('/api/bannerinfo',{
        params
    })
}
//封装轮播图修改接口
export function getBannerEdit(data){
    return http.post('/api/banneredit',data)
}
//封装轮播图删除接口
export function getBannerDelete(data){
    return http.post('/api/bannerdelete',data)
}

/* 限时秒杀管理接口 */
//封装限时秒杀添加接口
export function getSeckAdd(data){
    return http.post('/api/seckadd',data)
}
//封装限时秒杀列表接口
export function getSeckList(){
    return http.get('/api/secklist')
}
//封装限时秒杀获取（一条）接口
export function getSeckInfo(params){
    return http.get('/api/seckinfo',{
        params
    })
}
//封装限时秒杀修改接口
export function getSeckEdit(data){
    return http.post('/api/seckedit',data)
}
//封装限时秒杀删除接口
export function getSeckDelete(data){
    return http.post('/api/seckdelete',data)
}



