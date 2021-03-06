import {Injectable} from '@angular/core';
import * as lf from 'lovefield';
import {QueryState} from '../../shared/query-state.model';
import {Account} from './account.model';
import {Observable} from 'rxjs';

@Injectable()
export class AccountService {
    private database: lf.Database;
    private table: lf.schema.Table;
    private queryStates: QueryState[] = [];

    constructor() {
    }

    init(database: lf.Database) {
        this.database = database;
        this.table = database.getSchema().table(Account.TABLE_NAME);
    }

    observe(handler: Function, ...args): Observable<Object[]> {
        const query = this.database
            .select()
            .from(this.table);

        if (args['id']) {
            query.where(this.table['id'].eq(args['id']));
        }

        this.database.observe(query, handler);
        this.queryStates.push({
            query: query,
            handler: handler
        });

        return Observable.fromPromise(query.exec());
    }

    unobserve(): void {
        for (const [index, queryState] of this.queryStates.entries()) {
            this.database.unobserve(queryState.query, queryState.handler);
            this.queryStates.splice(index, 1);
        }
    }

    add(account: Account): Observable<Object[]> {
        const query = this.database
            .insert()
            .into(this.table)
            .values([this.table.createRow(account.toRow())]);

        return Observable.fromPromise(query.exec());
    }

    remove(account: Account): Observable<Object[]> {
        const query = this.database
            .delete()
            .from(this.table)
            .where(this.table['id'].eq(account.id));

        return Observable.fromPromise(query.exec());
    }
}

