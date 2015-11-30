JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Db = JsBedRock.Node.Db || {};
JsBedRock.Node.Db.MySql = JsBedRock.Node.Db.MySql || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Node.Db.MySql.MySqlQueryable = JsBedRock.Utils.ObjectOriented.CreateClass({
            Implements: [
                JsBedRock.Node.Db.IQueryable
            ],
            Constructor: function (modelType, conn) {
                this._ModelType = modelType;
                this._Connection = conn;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Execute: {
                    Def: function () {
                        var self = this;
						var promise = new JsBedRock.Promise();
                        
						this._Connection.Query(this._BuildQuery()).Success(function (result) {
                            promise.Resolve(
                                self._Resolve(result.GetCursor())
                            );
						}).Error(function (error) {
                            promise.Reject(error);
                        });
						
						return promise;
                    }
                },
                _Resolve: {
                    Def: function (results) {
                        var ret = new JsBedRock.Collections.List();
                        
                        for(var i = 0; i < results.length; i++) {
                            var model = new this._ModelType();
                            
                            for(var prop in results[i]) {
                                model[prop] = results[i][prop];
                            }
                            
                            ret.Add(model);
                        }
                        
                        return ret;
                    }
                },
                _BuildQuery: {
                    Def: function () {
                        var entityAttr = JsBedRock.Reflection.GetClassAttribute(this._ModelType, JsBedRock.Node.Db.MySql.MySqlEntityAttribute);
                        if(entityAttr) {
                            var table = entityAttr.SqlTableName;
                            var selectList = new JsBedRock.Collections.List();
                            var properties = JsBedRock.Reflection.GetPropertiesFromType(this._ModelType);
                            
                            for(var i = 0; i < properties.Count(); i++){
                                var property = properties.GetEnumerator()[i];
                                var fieldAttr = JsBedRock.Reflection.GetAttribute(this._ModelType, property, JsBedRock.Node.Db.MySql.MySqlEntityFieldAttribute);
                                
                                if(fieldAttr) {
                                    if(fieldAttr.SqlFieldName) {
                                        selectList.Add(fieldAttr.SqlFieldName);
                                    }
                                }
                            }
                                
                            return "SELECT " + selectList.GetEnumerator().join() + " FROM " + table;
                        }
                        
                        throw new Error("Queryable cannot generate query.");
                    }
                },
                _ModelType: {
                    Def: null
                },
                _Connection: {
                    Def: null
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);