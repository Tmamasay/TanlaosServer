'use strict'
const uuidv1 = require('uuid/v1'); //生成uuid
const Service = require('egg').Service;

class WriteSqlService extends Service {
    /**
     * 向mysql写入信息
     * @param {Object} options - 写入数据
     * @param {string} _sqlTable - 数据库表名
     * @param {boolean} isAdd - 判断是自增id还是uuid
     *  */
    async writeSql(options, _sqlTable, isAdd) {
        if (isAdd) {
            options = Object.assign(options, {
                ID: uuidv1()
            })
        }

        const result = await this.app.mysql.insert(_sqlTable, options);
        return {
            result
        };

    }
    /**
     * 向mysql写入信息(区别于商品编号和订单编号特殊性)
     * @param {Object} options - 写入数据
     * @param {string} _sqlTable - 数据库表名
     * @param {string} spcial_id - 生成的特殊编号
     *  */
    async writeSqlSpcial(options, _sqlTable, spcial_id) {
        options = Object.assign(options, {
            ID: spcial_id
        })
        const result = await this.app.mysql.insert(_sqlTable, options);
        return {
            result
        };

    }

    /**
     * 向mysql查询数据,select条件查询
     * @param {Object} _options - 写入数据
     * @param {string} _sqlTable - 数据库表名
     *  */
    async selectSql(_sqlTable, _options) {
        // let options = {
        //     where: {
        //         status: 'draft',
        //         author: ['author1', 'author2']
        //     }, // WHERE 条件
        //     columns: ['author', 'title'], // 要查询的表字段
        //     orders: [
        //         ['created_at', 'desc'],
        //         ['id', 'desc']
        //     ], // 排序方式
        //     limit: 10, // 返回数据量
        //     offset: 0, // 数据偏移量
        // }
        const result = await this.app.mysql.select(_sqlTable, _options);
        return {
            result
        }
    }

    /**
     * 向mysql更新数据
     * @param {Object} _row - 更新数据
     * @param {Object} _options - 自定义主键配置条件XX_ID
     * @param {string} _sqlTable - 数据库表名
     * @param {boolean}_isid - 主键是不是ID还是自定义主键XX_ID
     *  */
    async updateSql(_sqlTable, _row, _options, _isid) {
        // const row = {
        //     id: 123,
        //     name: 'fengmk2',
        //     otherField: 'other field value', // any other fields u want to update
        //     modifiedAt: this.app.mysql.literals.now, // `now()` on db server
        // };
        if (!_isid) {
            const result = await this.app.mysql.update(_sqlTable, _row);
            return {
                result
            }
        } else {
            console.log('----自定义ID----')
            const result = await this.app.mysql.update(_sqlTable, _row, _options);
            return {
                result
            }
        }

    }

/**
     * mysql删除数据
     * @param {Object} _options - 删除数据(条件)
     * @param {string} _sqlTable - 数据库表名
     *  */
    async delSql(_sqlTable, _options) {
        const result = await this.app.mysql.delete(_sqlTable, _options);
        return {
            result
        }
    }

}
module.exports = WriteSqlService;