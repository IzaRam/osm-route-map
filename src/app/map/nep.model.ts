export class Nep {
	constructor(
        public id: number,
        public osm_id: number,
        public osm_name: string,
        public osm_meta: string,
        public osm_source_id: number,
        public osm_target_id: number,
        public clazz: number,
        public flags: number,
        public source: number,
        public target: number,
        public km: number,
        public kmh: number,
        public cost: number,
        public reverse_cost: number,
        public x1: number,
        public y1: number,
        public x2: number,
        public y2: number,
        public geom_way: string 
    ) {}
}