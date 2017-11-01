
export class MovieModel {
  _showInfo = false;

  constructor(entity) {

    if (!entity) {
      entity = { pic: '', id: '', title: '', releaseYear: '', info: '', cast: '' };
    }
    this._entity = entity;
    //this.pic = entity.pic;
  }
  getEntity() {
    return this._entity;
  }
  get id() {
    return this._entity.id;
  }
  set id(value) {
    this._entity.id = parseInt(value, 10);
  }
  get title() {
    return this._entity.title;
  }
  set title(value) {
    this._entity.title = value;
  }
  get releaseYear() {
    return this._entity.releaseYear;
  }
  set releaseYear(value) {
    this._entity.releaseYear = parseInt(value, 10);
  }
  get info() {
    return this._entity.info;
  }
  set info(value) {
    this._entity.info = value;
  }
  get pic() {
    return this._entity.pic;
  }
  set pic(value) {
    this._entity.pic = value;
  }
  toggleInfo() {
    this.showInfo = !this.showInfo;
  }
  get showInfo() {
    return this._showInfo;
  }
  set showInfo(value) {
    this._showInfo = value;
  }
  get message() {
    return this.showInfo === true ? 'Less info' : 'More info';
  }
  //kode khate bala ? yani age show info true ast less info ro neshon bede otherwise more info ro neshon
  // in code ya onike bala mostaghm neveshti dota yeki kar mikone on
  //on balai ham getero setter dare age bekhay khodet
  //avas koni in paini rahattare get pic() {
  //   return this._entity.pic;
  // }
  // set pic(value) {
  //   this._entity.pic = value;
  // }
}

