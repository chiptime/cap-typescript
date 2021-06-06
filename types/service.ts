export interface Service {
    before: any;
    on: any;
    after: any;
};

export interface ApplicationService extends NodeModule, Service {
    _2fiori: any;
    _calculateDiff: any;
    _differ: any;
    _handlers: any;
    _source: any;
    definition: any;
    entities: any;
    events: any;
    kind: any;
    model: any;
    name: any;
    namespace: any;
    operations: any;
    options: any;
    path: any;
};
