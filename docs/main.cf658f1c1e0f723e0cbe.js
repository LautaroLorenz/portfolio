(window.webpackJsonp = window.webpackJsonp || []).push([
	[1],
	{
		0: function (t, e, n) {
			t.exports = n('zUnb');
		},
		'2QA8': function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return r;
			});
			const r = (() =>
				'function' == typeof Symbol
					? Symbol('rxSubscriber')
					: '@@rxSubscriber_' + Math.random())();
		},
		'2fFW': function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return s;
			});
			let r = !1;
			const s = {
				Promise: void 0,
				set useDeprecatedSynchronousErrorHandling(t) {
					if (t) {
						const t = new Error();
						console.warn(
							'DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' +
								t.stack
						);
					} else
						r &&
							console.log(
								'RxJS: Back to a better error behavior. Thank you. <3'
							);
					r = t;
				},
				get useDeprecatedSynchronousErrorHandling() {
					return r;
				}
			};
		},
		'5+tZ': function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return o;
			});
			var r = n('lJxs'),
				s = n('Cfvw'),
				i = n('zx2A');
			function o(t, e, n = Number.POSITIVE_INFINITY) {
				return 'function' == typeof e
					? (i) =>
							i.pipe(
								o(
									(n, i) =>
										Object(s.a)(t(n, i)).pipe(
											Object(r.a)((t, r) => e(n, t, i, r))
										),
									n
								)
							)
					: ('number' == typeof e && (n = e),
					  (e) => e.lift(new a(t, n)));
			}
			class a {
				constructor(t, e = Number.POSITIVE_INFINITY) {
					(this.project = t), (this.concurrent = e);
				}
				call(t, e) {
					return e.subscribe(new l(t, this.project, this.concurrent));
				}
			}
			class l extends i.b {
				constructor(t, e, n = Number.POSITIVE_INFINITY) {
					super(t),
						(this.project = e),
						(this.concurrent = n),
						(this.hasCompleted = !1),
						(this.buffer = []),
						(this.active = 0),
						(this.index = 0);
				}
				_next(t) {
					this.active < this.concurrent
						? this._tryNext(t)
						: this.buffer.push(t);
				}
				_tryNext(t) {
					let e;
					const n = this.index++;
					try {
						e = this.project(t, n);
					} catch (r) {
						return void this.destination.error(r);
					}
					this.active++, this._innerSub(e);
				}
				_innerSub(t) {
					const e = new i.a(this),
						n = this.destination;
					n.add(e);
					const r = Object(i.c)(t, e);
					r !== e && n.add(r);
				}
				_complete() {
					(this.hasCompleted = !0),
						0 === this.active &&
							0 === this.buffer.length &&
							this.destination.complete(),
						this.unsubscribe();
				}
				notifyNext(t) {
					this.destination.next(t);
				}
				notifyComplete() {
					const t = this.buffer;
					this.active--,
						t.length > 0
							? this._next(t.shift())
							: 0 === this.active &&
							  this.hasCompleted &&
							  this.destination.complete();
				}
			}
		},
		'7o/Q': function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return c;
			});
			var r = n('n6bG'),
				s = n('gRHU'),
				i = n('quSY'),
				o = n('2QA8'),
				a = n('2fFW'),
				l = n('NJ4a');
			class c extends i.a {
				constructor(t, e, n) {
					switch (
						(super(),
						(this.syncErrorValue = null),
						(this.syncErrorThrown = !1),
						(this.syncErrorThrowable = !1),
						(this.isStopped = !1),
						arguments.length)
					) {
						case 0:
							this.destination = s.a;
							break;
						case 1:
							if (!t) {
								this.destination = s.a;
								break;
							}
							if ('object' == typeof t) {
								t instanceof c
									? ((this.syncErrorThrowable =
											t.syncErrorThrowable),
									  (this.destination = t),
									  t.add(this))
									: ((this.syncErrorThrowable = !0),
									  (this.destination = new u(this, t)));
								break;
							}
						default:
							(this.syncErrorThrowable = !0),
								(this.destination = new u(this, t, e, n));
					}
				}
				[o.a]() {
					return this;
				}
				static create(t, e, n) {
					const r = new c(t, e, n);
					return (r.syncErrorThrowable = !1), r;
				}
				next(t) {
					this.isStopped || this._next(t);
				}
				error(t) {
					this.isStopped || ((this.isStopped = !0), this._error(t));
				}
				complete() {
					this.isStopped || ((this.isStopped = !0), this._complete());
				}
				unsubscribe() {
					this.closed || ((this.isStopped = !0), super.unsubscribe());
				}
				_next(t) {
					this.destination.next(t);
				}
				_error(t) {
					this.destination.error(t), this.unsubscribe();
				}
				_complete() {
					this.destination.complete(), this.unsubscribe();
				}
				_unsubscribeAndRecycle() {
					const { _parentOrParents: t } = this;
					return (
						(this._parentOrParents = null),
						this.unsubscribe(),
						(this.closed = !1),
						(this.isStopped = !1),
						(this._parentOrParents = t),
						this
					);
				}
			}
			class u extends c {
				constructor(t, e, n, i) {
					let o;
					super(), (this._parentSubscriber = t);
					let a = this;
					Object(r.a)(e)
						? (o = e)
						: e &&
						  ((o = e.next),
						  (n = e.error),
						  (i = e.complete),
						  e !== s.a &&
								((a = Object.create(e)),
								Object(r.a)(a.unsubscribe) &&
									this.add(a.unsubscribe.bind(a)),
								(a.unsubscribe = this.unsubscribe.bind(this)))),
						(this._context = a),
						(this._next = o),
						(this._error = n),
						(this._complete = i);
				}
				next(t) {
					if (!this.isStopped && this._next) {
						const { _parentSubscriber: e } = this;
						a.a.useDeprecatedSynchronousErrorHandling &&
						e.syncErrorThrowable
							? this.__tryOrSetError(e, this._next, t) &&
							  this.unsubscribe()
							: this.__tryOrUnsub(this._next, t);
					}
				}
				error(t) {
					if (!this.isStopped) {
						const { _parentSubscriber: e } = this,
							{ useDeprecatedSynchronousErrorHandling: n } = a.a;
						if (this._error)
							n && e.syncErrorThrowable
								? (this.__tryOrSetError(e, this._error, t),
								  this.unsubscribe())
								: (this.__tryOrUnsub(this._error, t),
								  this.unsubscribe());
						else if (e.syncErrorThrowable)
							n
								? ((e.syncErrorValue = t),
								  (e.syncErrorThrown = !0))
								: Object(l.a)(t),
								this.unsubscribe();
						else {
							if ((this.unsubscribe(), n)) throw t;
							Object(l.a)(t);
						}
					}
				}
				complete() {
					if (!this.isStopped) {
						const { _parentSubscriber: t } = this;
						if (this._complete) {
							const e = () => this._complete.call(this._context);
							a.a.useDeprecatedSynchronousErrorHandling &&
							t.syncErrorThrowable
								? (this.__tryOrSetError(t, e),
								  this.unsubscribe())
								: (this.__tryOrUnsub(e), this.unsubscribe());
						} else this.unsubscribe();
					}
				}
				__tryOrUnsub(t, e) {
					try {
						t.call(this._context, e);
					} catch (n) {
						if (
							(this.unsubscribe(),
							a.a.useDeprecatedSynchronousErrorHandling)
						)
							throw n;
						Object(l.a)(n);
					}
				}
				__tryOrSetError(t, e, n) {
					if (!a.a.useDeprecatedSynchronousErrorHandling)
						throw new Error('bad call');
					try {
						e.call(this._context, n);
					} catch (r) {
						return a.a.useDeprecatedSynchronousErrorHandling
							? ((t.syncErrorValue = r),
							  (t.syncErrorThrown = !0),
							  !0)
							: (Object(l.a)(r), !0);
					}
					return !1;
				}
				_unsubscribe() {
					const { _parentSubscriber: t } = this;
					(this._context = null),
						(this._parentSubscriber = null),
						t.unsubscribe();
				}
			}
		},
		'9ppp': function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return r;
			});
			const r = (() => {
				function t() {
					return (
						Error.call(this),
						(this.message = 'object unsubscribed'),
						(this.name = 'ObjectUnsubscribedError'),
						this
					);
				}
				return (t.prototype = Object.create(Error.prototype)), t;
			})();
		},
		Cfvw: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return h;
			});
			var r = n('HDdC'),
				s = n('SeVD'),
				i = n('quSY'),
				o = n('kJWO'),
				a = n('jZKg'),
				l = n('Lhse'),
				c = n('c2HN'),
				u = n('I55L');
			function h(t, e) {
				return e
					? (function (t, e) {
							if (null != t) {
								if (
									(function (t) {
										return t && 'function' == typeof t[o.a];
									})(t)
								)
									return (function (t, e) {
										return new r.a((n) => {
											const r = new i.a();
											return (
												r.add(
													e.schedule(() => {
														const s = t[o.a]();
														r.add(
															s.subscribe({
																next(t) {
																	r.add(
																		e.schedule(
																			() =>
																				n.next(
																					t
																				)
																		)
																	);
																},
																error(t) {
																	r.add(
																		e.schedule(
																			() =>
																				n.error(
																					t
																				)
																		)
																	);
																},
																complete() {
																	r.add(
																		e.schedule(
																			() =>
																				n.complete()
																		)
																	);
																}
															})
														);
													})
												),
												r
											);
										});
									})(t, e);
								if (Object(c.a)(t))
									return (function (t, e) {
										return new r.a((n) => {
											const r = new i.a();
											return (
												r.add(
													e.schedule(() =>
														t.then(
															(t) => {
																r.add(
																	e.schedule(
																		() => {
																			n.next(
																				t
																			),
																				r.add(
																					e.schedule(
																						() =>
																							n.complete()
																					)
																				);
																		}
																	)
																);
															},
															(t) => {
																r.add(
																	e.schedule(
																		() =>
																			n.error(
																				t
																			)
																	)
																);
															}
														)
													)
												),
												r
											);
										});
									})(t, e);
								if (Object(u.a)(t)) return Object(a.a)(t, e);
								if (
									(function (t) {
										return t && 'function' == typeof t[l.a];
									})(t) ||
									'string' == typeof t
								)
									return (function (t, e) {
										if (!t)
											throw new Error(
												'Iterable cannot be null'
											);
										return new r.a((n) => {
											const r = new i.a();
											let s;
											return (
												r.add(() => {
													s &&
														'function' ==
															typeof s.return &&
														s.return();
												}),
												r.add(
													e.schedule(() => {
														(s = t[l.a]()),
															r.add(
																e.schedule(
																	function () {
																		if (
																			n.closed
																		)
																			return;
																		let t,
																			e;
																		try {
																			const n = s.next();
																			(t =
																				n.value),
																				(e =
																					n.done);
																		} catch (r) {
																			return void n.error(
																				r
																			);
																		}
																		e
																			? n.complete()
																			: (n.next(
																					t
																			  ),
																			  this.schedule());
																	}
																)
															);
													})
												),
												r
											);
										});
									})(t, e);
							}
							throw new TypeError(
								((null !== t && typeof t) || t) +
									' is not observable'
							);
					  })(t, e)
					: t instanceof r.a
					? t
					: new r.a(Object(s.a)(t));
			}
		},
		DH7j: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return r;
			});
			const r = (() =>
				Array.isArray || ((t) => t && 'number' == typeof t.length))();
		},
		EQ5u: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return a;
			}),
				n.d(e, 'b', function () {
					return l;
				});
			var r = n('XNiG'),
				s = n('HDdC'),
				i = (n('7o/Q'), n('quSY')),
				o = n('x+ZX');
			class a extends s.a {
				constructor(t, e) {
					super(),
						(this.source = t),
						(this.subjectFactory = e),
						(this._refCount = 0),
						(this._isComplete = !1);
				}
				_subscribe(t) {
					return this.getSubject().subscribe(t);
				}
				getSubject() {
					const t = this._subject;
					return (
						(t && !t.isStopped) ||
							(this._subject = this.subjectFactory()),
						this._subject
					);
				}
				connect() {
					let t = this._connection;
					return (
						t ||
							((this._isComplete = !1),
							(t = this._connection = new i.a()),
							t.add(
								this.source.subscribe(
									new c(this.getSubject(), this)
								)
							),
							t.closed &&
								((this._connection = null), (t = i.a.EMPTY))),
						t
					);
				}
				refCount() {
					return Object(o.a)()(this);
				}
			}
			const l = (() => {
				const t = a.prototype;
				return {
					operator: { value: null },
					_refCount: { value: 0, writable: !0 },
					_subject: { value: null, writable: !0 },
					_connection: { value: null, writable: !0 },
					_subscribe: { value: t._subscribe },
					_isComplete: { value: t._isComplete, writable: !0 },
					getSubject: { value: t.getSubject },
					connect: { value: t.connect },
					refCount: { value: t.refCount }
				};
			})();
			class c extends r.b {
				constructor(t, e) {
					super(t), (this.connectable = e);
				}
				_error(t) {
					this._unsubscribe(), super._error(t);
				}
				_complete() {
					(this.connectable._isComplete = !0),
						this._unsubscribe(),
						super._complete();
				}
				_unsubscribe() {
					const t = this.connectable;
					if (t) {
						this.connectable = null;
						const e = t._connection;
						(t._refCount = 0),
							(t._subject = null),
							(t._connection = null),
							e && e.unsubscribe();
					}
				}
			}
		},
		HDdC: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return c;
			});
			var r = n('7o/Q'),
				s = n('2QA8'),
				i = n('gRHU'),
				o = n('kJWO'),
				a = n('SpAZ'),
				l = n('2fFW');
			let c = (() => {
				class t {
					constructor(t) {
						(this._isScalar = !1), t && (this._subscribe = t);
					}
					lift(e) {
						const n = new t();
						return (n.source = this), (n.operator = e), n;
					}
					subscribe(t, e, n) {
						const { operator: o } = this,
							a = (function (t, e, n) {
								if (t) {
									if (t instanceof r.a) return t;
									if (t[s.a]) return t[s.a]();
								}
								return t || e || n
									? new r.a(t, e, n)
									: new r.a(i.a);
							})(t, e, n);
						if (
							(a.add(
								o
									? o.call(a, this.source)
									: this.source ||
									  (l.a
											.useDeprecatedSynchronousErrorHandling &&
											!a.syncErrorThrowable)
									? this._subscribe(a)
									: this._trySubscribe(a)
							),
							l.a.useDeprecatedSynchronousErrorHandling &&
								a.syncErrorThrowable &&
								((a.syncErrorThrowable = !1),
								a.syncErrorThrown))
						)
							throw a.syncErrorValue;
						return a;
					}
					_trySubscribe(t) {
						try {
							return this._subscribe(t);
						} catch (e) {
							l.a.useDeprecatedSynchronousErrorHandling &&
								((t.syncErrorThrown = !0),
								(t.syncErrorValue = e)),
								(function (t) {
									for (; t; ) {
										const {
											closed: e,
											destination: n,
											isStopped: s
										} = t;
										if (e || s) return !1;
										t = n && n instanceof r.a ? n : null;
									}
									return !0;
								})(t)
									? t.error(e)
									: console.warn(e);
						}
					}
					forEach(t, e) {
						return new (e = u(e))((e, n) => {
							let r;
							r = this.subscribe(
								(e) => {
									try {
										t(e);
									} catch (s) {
										n(s), r && r.unsubscribe();
									}
								},
								n,
								e
							);
						});
					}
					_subscribe(t) {
						const { source: e } = this;
						return e && e.subscribe(t);
					}
					[o.a]() {
						return this;
					}
					pipe(...t) {
						return 0 === t.length
							? this
							: (0 === (e = t).length
									? a.a
									: 1 === e.length
									? e[0]
									: function (t) {
											return e.reduce((t, e) => e(t), t);
									  })(this);
						var e;
					}
					toPromise(t) {
						return new (t = u(t))((t, e) => {
							let n;
							this.subscribe(
								(t) => (n = t),
								(t) => e(t),
								() => t(n)
							);
						});
					}
				}
				return (t.create = (e) => new t(e)), t;
			})();
			function u(t) {
				if ((t || (t = l.a.Promise || Promise), !t))
					throw new Error('no Promise impl found');
				return t;
			}
		},
		I55L: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return r;
			});
			const r = (t) =>
				t && 'number' == typeof t.length && 'function' != typeof t;
		},
		Lhse: function (t, e, n) {
			'use strict';
			function r() {
				return 'function' == typeof Symbol && Symbol.iterator
					? Symbol.iterator
					: '@@iterator';
			}
			n.d(e, 'a', function () {
				return s;
			});
			const s = r();
		},
		NJ4a: function (t, e, n) {
			'use strict';
			function r(t) {
				setTimeout(() => {
					throw t;
				}, 0);
			}
			n.d(e, 'a', function () {
				return r;
			});
		},
		SeVD: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return u;
			});
			var r = n('ngJS'),
				s = n('NJ4a'),
				i = n('Lhse'),
				o = n('kJWO'),
				a = n('I55L'),
				l = n('c2HN'),
				c = n('XoHu');
			const u = (t) => {
				if (t && 'function' == typeof t[o.a])
					return (
						(u = t),
						(t) => {
							const e = u[o.a]();
							if ('function' != typeof e.subscribe)
								throw new TypeError(
									'Provided object does not correctly implement Symbol.observable'
								);
							return e.subscribe(t);
						}
					);
				if (Object(a.a)(t)) return Object(r.a)(t);
				if (Object(l.a)(t))
					return (
						(n = t),
						(t) => (
							n
								.then(
									(e) => {
										t.closed || (t.next(e), t.complete());
									},
									(e) => t.error(e)
								)
								.then(null, s.a),
							t
						)
					);
				if (t && 'function' == typeof t[i.a])
					return (
						(e = t),
						(t) => {
							const n = e[i.a]();
							for (;;) {
								let e;
								try {
									e = n.next();
								} catch (r) {
									return t.error(r), t;
								}
								if (e.done) {
									t.complete();
									break;
								}
								if ((t.next(e.value), t.closed)) break;
							}
							return (
								'function' == typeof n.return &&
									t.add(() => {
										n.return && n.return();
									}),
								t
							);
						}
					);
				{
					const e = Object(c.a)(t) ? 'an invalid object' : `'${t}'`;
					throw new TypeError(
						`You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
					);
				}
				var e, n, u;
			};
		},
		SpAZ: function (t, e, n) {
			'use strict';
			function r(t) {
				return t;
			}
			n.d(e, 'a', function () {
				return r;
			});
		},
		XNiG: function (t, e, n) {
			'use strict';
			n.d(e, 'b', function () {
				return c;
			}),
				n.d(e, 'a', function () {
					return u;
				});
			var r = n('HDdC'),
				s = n('7o/Q'),
				i = n('quSY'),
				o = n('9ppp');
			class a extends i.a {
				constructor(t, e) {
					super(),
						(this.subject = t),
						(this.subscriber = e),
						(this.closed = !1);
				}
				unsubscribe() {
					if (this.closed) return;
					this.closed = !0;
					const t = this.subject,
						e = t.observers;
					if (
						((this.subject = null),
						!e || 0 === e.length || t.isStopped || t.closed)
					)
						return;
					const n = e.indexOf(this.subscriber);
					-1 !== n && e.splice(n, 1);
				}
			}
			var l = n('2QA8');
			class c extends s.a {
				constructor(t) {
					super(t), (this.destination = t);
				}
			}
			let u = (() => {
				class t extends r.a {
					constructor() {
						super(),
							(this.observers = []),
							(this.closed = !1),
							(this.isStopped = !1),
							(this.hasError = !1),
							(this.thrownError = null);
					}
					[l.a]() {
						return new c(this);
					}
					lift(t) {
						const e = new h(this, this);
						return (e.operator = t), e;
					}
					next(t) {
						if (this.closed) throw new o.a();
						if (!this.isStopped) {
							const { observers: e } = this,
								n = e.length,
								r = e.slice();
							for (let s = 0; s < n; s++) r[s].next(t);
						}
					}
					error(t) {
						if (this.closed) throw new o.a();
						(this.hasError = !0),
							(this.thrownError = t),
							(this.isStopped = !0);
						const { observers: e } = this,
							n = e.length,
							r = e.slice();
						for (let s = 0; s < n; s++) r[s].error(t);
						this.observers.length = 0;
					}
					complete() {
						if (this.closed) throw new o.a();
						this.isStopped = !0;
						const { observers: t } = this,
							e = t.length,
							n = t.slice();
						for (let r = 0; r < e; r++) n[r].complete();
						this.observers.length = 0;
					}
					unsubscribe() {
						(this.isStopped = !0),
							(this.closed = !0),
							(this.observers = null);
					}
					_trySubscribe(t) {
						if (this.closed) throw new o.a();
						return super._trySubscribe(t);
					}
					_subscribe(t) {
						if (this.closed) throw new o.a();
						return this.hasError
							? (t.error(this.thrownError), i.a.EMPTY)
							: this.isStopped
							? (t.complete(), i.a.EMPTY)
							: (this.observers.push(t), new a(this, t));
					}
					asObservable() {
						const t = new r.a();
						return (t.source = this), t;
					}
				}
				return (t.create = (t, e) => new h(t, e)), t;
			})();
			class h extends u {
				constructor(t, e) {
					super(), (this.destination = t), (this.source = e);
				}
				next(t) {
					const { destination: e } = this;
					e && e.next && e.next(t);
				}
				error(t) {
					const { destination: e } = this;
					e && e.error && this.destination.error(t);
				}
				complete() {
					const { destination: t } = this;
					t && t.complete && this.destination.complete();
				}
				_subscribe(t) {
					const { source: e } = this;
					return e ? this.source.subscribe(t) : i.a.EMPTY;
				}
			}
		},
		XoHu: function (t, e, n) {
			'use strict';
			function r(t) {
				return null !== t && 'object' == typeof t;
			}
			n.d(e, 'a', function () {
				return r;
			});
		},
		bHdf: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return i;
			});
			var r = n('5+tZ'),
				s = n('SpAZ');
			function i(t = Number.POSITIVE_INFINITY) {
				return Object(r.a)(s.a, t);
			}
		},
		c2HN: function (t, e, n) {
			'use strict';
			function r(t) {
				return (
					!!t &&
					'function' != typeof t.subscribe &&
					'function' == typeof t.then
				);
			}
			n.d(e, 'a', function () {
				return r;
			});
		},
		fXoL: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return Ge;
			}),
				n.d(e, 'b', function () {
					return Xo;
				}),
				n.d(e, 'c', function () {
					return Wo;
				}),
				n.d(e, 'd', function () {
					return Bo;
				}),
				n.d(e, 'e', function () {
					return Qo;
				}),
				n.d(e, 'f', function () {
					return Va;
				}),
				n.d(e, 'g', function () {
					return Na;
				}),
				n.d(e, 'h', function () {
					return Yi;
				}),
				n.d(e, 'i', function () {
					return ca;
				}),
				n.d(e, 'j', function () {
					return Ei;
				}),
				n.d(e, 'k', function () {
					return ea;
				}),
				n.d(e, 'l', function () {
					return Oi;
				}),
				n.d(e, 'm', function () {
					return ir;
				}),
				n.d(e, 'n', function () {
					return ko;
				}),
				n.d(e, 'o', function () {
					return Os;
				}),
				n.d(e, 'p', function () {
					return dn;
				}),
				n.d(e, 'q', function () {
					return j;
				}),
				n.d(e, 'r', function () {
					return Ze;
				}),
				n.d(e, 's', function () {
					return zs;
				}),
				n.d(e, 't', function () {
					return Qi;
				}),
				n.d(e, 'u', function () {
					return Zi;
				}),
				n.d(e, 'v', function () {
					return ta;
				}),
				n.d(e, 'w', function () {
					return uo;
				}),
				n.d(e, 'x', function () {
					return Fa;
				}),
				n.d(e, 'y', function () {
					return co;
				}),
				n.d(e, 'z', function () {
					return Aa;
				}),
				n.d(e, 'A', function () {
					return da;
				}),
				n.d(e, 'B', function () {
					return fn;
				}),
				n.d(e, 'C', function () {
					return Jo;
				}),
				n.d(e, 'D', function () {
					return Ko;
				}),
				n.d(e, 'E', function () {
					return Ii;
				}),
				n.d(e, 'F', function () {
					return Ai;
				}),
				n.d(e, 'G', function () {
					return cr;
				}),
				n.d(e, 'H', function () {
					return Ri;
				}),
				n.d(e, 'I', function () {
					return tr;
				}),
				n.d(e, 'J', function () {
					return pn;
				}),
				n.d(e, 'K', function () {
					return Ua;
				}),
				n.d(e, 'L', function () {
					return io;
				}),
				n.d(e, 'M', function () {
					return ba;
				}),
				n.d(e, 'N', function () {
					return Ke;
				}),
				n.d(e, 'O', function () {
					return Pi;
				}),
				n.d(e, 'P', function () {
					return fo;
				}),
				n.d(e, 'Q', function () {
					return L;
				}),
				n.d(e, 'R', function () {
					return Ia;
				}),
				n.d(e, 'S', function () {
					return Oa;
				}),
				n.d(e, 'T', function () {
					return za;
				}),
				n.d(e, 'U', function () {
					return Sa;
				}),
				n.d(e, 'V', function () {
					return Yo;
				}),
				n.d(e, 'W', function () {
					return As;
				}),
				n.d(e, 'X', function () {
					return yi;
				}),
				n.d(e, 'Y', function () {
					return Xn;
				}),
				n.d(e, 'Z', function () {
					return Dn;
				}),
				n.d(e, 'ab', function () {
					return Cn;
				}),
				n.d(e, 'bb', function () {
					return xn;
				}),
				n.d(e, 'cb', function () {
					return In;
				}),
				n.d(e, 'db', function () {
					return kn;
				}),
				n.d(e, 'eb', function () {
					return On;
				}),
				n.d(e, 'fb', function () {
					return An;
				}),
				n.d(e, 'gb', function () {
					return fi;
				}),
				n.d(e, 'hb', function () {
					return $a;
				}),
				n.d(e, 'ib', function () {
					return pi;
				}),
				n.d(e, 'jb', function () {
					return mi;
				}),
				n.d(e, 'kb', function () {
					return Tn;
				}),
				n.d(e, 'lb', function () {
					return z;
				}),
				n.d(e, 'mb', function () {
					return Qs;
				}),
				n.d(e, 'nb', function () {
					return ri;
				}),
				n.d(e, 'ob', function () {
					return ei;
				}),
				n.d(e, 'pb', function () {
					return ni;
				}),
				n.d(e, 'qb', function () {
					return di;
				}),
				n.d(e, 'rb', function () {
					return xt;
				}),
				n.d(e, 'sb', function () {
					return f;
				}),
				n.d(e, 'tb', function () {
					return En;
				}),
				n.d(e, 'ub', function () {
					return vt;
				}),
				n.d(e, 'vb', function () {
					return Gs;
				}),
				n.d(e, 'wb', function () {
					return $o;
				}),
				n.d(e, 'xb', function () {
					return Y;
				}),
				n.d(e, 'yb', function () {
					return ot;
				}),
				n.d(e, 'zb', function () {
					return S;
				}),
				n.d(e, 'Ab', function () {
					return E;
				}),
				n.d(e, 'Bb', function () {
					return rt;
				}),
				n.d(e, 'Cb', function () {
					return at;
				}),
				n.d(e, 'Db', function () {
					return Ks;
				}),
				n.d(e, 'Eb', function () {
					return ti;
				}),
				n.d(e, 'Fb', function () {
					return Ys;
				}),
				n.d(e, 'Gb', function () {
					return Xs;
				}),
				n.d(e, 'Hb', function () {
					return li;
				}),
				n.d(e, 'Ib', function () {
					return cn;
				}),
				n.d(e, 'Jb', function () {
					return Be;
				}),
				n.d(e, 'Kb', function () {
					return Vo;
				}),
				n.d(e, 'Lb', function () {
					return si;
				}),
				n.d(e, 'Mb', function () {
					return zo;
				}),
				n.d(e, 'Nb', function () {
					return Ho;
				}),
				n.d(e, 'Ob', function () {
					return er;
				}),
				n.d(e, 'Pb', function () {
					return st;
				}),
				n.d(e, 'Qb', function () {
					return ai;
				});
			var r = n('XNiG'),
				s = n('quSY'),
				i = n('HDdC'),
				o = n('z+Ro'),
				a = n('bHdf'),
				l = n('yCtX'),
				c = n('EQ5u'),
				u = n('x+ZX');
			function h() {
				return new r.a();
			}
			function d(t) {
				for (let e in t) if (t[e] === d) return e;
				throw Error(
					'Could not find renamed property on target object.'
				);
			}
			function f(t) {
				if ('string' == typeof t) return t;
				if (Array.isArray(t)) return '[' + t.map(f).join(', ') + ']';
				if (null == t) return '' + t;
				if (t.overriddenName) return `${t.overriddenName}`;
				if (t.name) return `${t.name}`;
				const e = t.toString();
				if (null == e) return '' + e;
				const n = e.indexOf('\n');
				return -1 === n ? e : e.substring(0, n);
			}
			function p(t, e) {
				return null == t || '' === t
					? null === e
						? ''
						: e
					: null == e || '' === e
					? t
					: t + ' ' + e;
			}
			const m = d({ __forward_ref__: d });
			function g(t) {
				return (
					(t.__forward_ref__ = g),
					(t.toString = function () {
						return f(this());
					}),
					t
				);
			}
			function y(t) {
				return 'function' == typeof (e = t) &&
					e.hasOwnProperty(m) &&
					e.__forward_ref__ === g
					? t()
					: t;
				var e;
			}
			class _ extends Error {
				constructor(t, e) {
					super(
						(function (t, e) {
							return `${t ? `NG0${t}: ` : ''}${e}`;
						})(t, e)
					),
						(this.code = t);
				}
			}
			function b(t) {
				return 'string' == typeof t ? t : null == t ? '' : String(t);
			}
			function v(t) {
				return 'function' == typeof t
					? t.name || t.toString()
					: 'object' == typeof t &&
					  null != t &&
					  'function' == typeof t.type
					? t.type.name || t.type.toString()
					: b(t);
			}
			function w(t, e) {
				const n = e ? ` in ${e}` : '';
				throw new _('201', `No provider for ${v(t)} found${n}`);
			}
			function S(t) {
				return {
					token: t.token,
					providedIn: t.providedIn || null,
					factory: t.factory,
					value: void 0
				};
			}
			function E(t) {
				return {
					providers: t.providers || [],
					imports: t.imports || []
				};
			}
			function C(t) {
				return T(t, O) || T(t, A);
			}
			function T(t, e) {
				return t.hasOwnProperty(e) ? t[e] : null;
			}
			function x(t) {
				return t && (t.hasOwnProperty(k) || t.hasOwnProperty(I))
					? t[k]
					: null;
			}
			const O = d({ '\u0275prov': d }),
				k = d({ '\u0275inj': d }),
				A = d({ ngInjectableDef: d }),
				I = d({ ngInjectorDef: d });
			var j = (function (t) {
				return (
					(t[(t.Default = 0)] = 'Default'),
					(t[(t.Host = 1)] = 'Host'),
					(t[(t.Self = 2)] = 'Self'),
					(t[(t.SkipSelf = 4)] = 'SkipSelf'),
					(t[(t.Optional = 8)] = 'Optional'),
					t
				);
			})({});
			let R;
			function P(t) {
				const e = R;
				return (R = t), e;
			}
			function N(t, e, n) {
				const r = C(t);
				return r && 'root' == r.providedIn
					? void 0 === r.value
						? (r.value = r.factory())
						: r.value
					: n & j.Optional
					? null
					: void 0 !== e
					? e
					: void w(f(t), 'Injector');
			}
			function D(t) {
				return { toString: t }.toString();
			}
			var F = (function (t) {
					return (
						(t[(t.OnPush = 0)] = 'OnPush'),
						(t[(t.Default = 1)] = 'Default'),
						t
					);
				})({}),
				L = (function (t) {
					return (
						(t[(t.Emulated = 0)] = 'Emulated'),
						(t[(t.None = 2)] = 'None'),
						(t[(t.ShadowDom = 3)] = 'ShadowDom'),
						t
					);
				})({});
			const M = 'undefined' != typeof globalThis && globalThis,
				U = 'undefined' != typeof window && window,
				H =
					'undefined' != typeof self &&
					'undefined' != typeof WorkerGlobalScope &&
					self instanceof WorkerGlobalScope &&
					self,
				$ = 'undefined' != typeof global && global,
				z = M || $ || U || H,
				q = {},
				V = [],
				B = d({ '\u0275cmp': d }),
				Q = d({ '\u0275dir': d }),
				W = d({ '\u0275pipe': d }),
				Z = d({ '\u0275mod': d }),
				G = d({ '\u0275loc': d }),
				K = d({ '\u0275fac': d }),
				J = d({ __NG_ELEMENT_ID__: d });
			let X = 0;
			function Y(t) {
				return D(() => {
					const e = {},
						n = {
							type: t.type,
							providersResolver: null,
							decls: t.decls,
							vars: t.vars,
							factory: null,
							template: t.template || null,
							consts: t.consts || null,
							ngContentSelectors: t.ngContentSelectors,
							hostBindings: t.hostBindings || null,
							hostVars: t.hostVars || 0,
							hostAttrs: t.hostAttrs || null,
							contentQueries: t.contentQueries || null,
							declaredInputs: e,
							inputs: null,
							outputs: null,
							exportAs: t.exportAs || null,
							onPush: t.changeDetection === F.OnPush,
							directiveDefs: null,
							pipeDefs: null,
							selectors: t.selectors || V,
							viewQuery: t.viewQuery || null,
							features: t.features || null,
							data: t.data || {},
							encapsulation: t.encapsulation || L.Emulated,
							id: 'c',
							styles: t.styles || V,
							_: null,
							setInput: null,
							schemas: t.schemas || null,
							tView: null
						},
						r = t.directives,
						s = t.features,
						i = t.pipes;
					return (
						(n.id += X++),
						(n.inputs = it(t.inputs, e)),
						(n.outputs = it(t.outputs)),
						s && s.forEach((t) => t(n)),
						(n.directiveDefs = r
							? () => ('function' == typeof r ? r() : r).map(tt)
							: null),
						(n.pipeDefs = i
							? () => ('function' == typeof i ? i() : i).map(et)
							: null),
						n
					);
				});
			}
			function tt(t) {
				return (
					lt(t) ||
					(function (t) {
						return t[Q] || null;
					})(t)
				);
			}
			function et(t) {
				return (function (t) {
					return t[W] || null;
				})(t);
			}
			const nt = {};
			function rt(t) {
				const e = {
					type: t.type,
					bootstrap: t.bootstrap || V,
					declarations: t.declarations || V,
					imports: t.imports || V,
					exports: t.exports || V,
					transitiveCompileScopes: null,
					schemas: t.schemas || null,
					id: t.id || null
				};
				return (
					null != t.id &&
						D(() => {
							nt[t.id] = t.type;
						}),
					e
				);
			}
			function st(t, e) {
				return D(() => {
					const n = ct(t, !0);
					(n.declarations = e.declarations || V),
						(n.imports = e.imports || V),
						(n.exports = e.exports || V);
				});
			}
			function it(t, e) {
				if (null == t) return q;
				const n = {};
				for (const r in t)
					if (t.hasOwnProperty(r)) {
						let s = t[r],
							i = s;
						Array.isArray(s) && ((i = s[1]), (s = s[0])),
							(n[s] = r),
							e && (e[s] = i);
					}
				return n;
			}
			const ot = Y;
			function at(t) {
				return {
					type: t.type,
					name: t.name,
					factory: null,
					pure: !1 !== t.pure,
					onDestroy: t.type.prototype.ngOnDestroy || null
				};
			}
			function lt(t) {
				return t[B] || null;
			}
			function ct(t, e) {
				const n = t[Z] || null;
				if (!n && !0 === e)
					throw new Error(
						`Type ${f(t)} does not have '\u0275mod' property.`
					);
				return n;
			}
			const ut = 20,
				ht = 10;
			function dt(t) {
				return Array.isArray(t) && 'object' == typeof t[1];
			}
			function ft(t) {
				return Array.isArray(t) && !0 === t[1];
			}
			function pt(t) {
				return 0 != (8 & t.flags);
			}
			function mt(t) {
				return 2 == (2 & t.flags);
			}
			function gt(t) {
				return 1 == (1 & t.flags);
			}
			function yt(t) {
				return null !== t.template;
			}
			function _t(t, e) {
				return t.hasOwnProperty(K) ? t[K] : null;
			}
			class bt {
				constructor(t, e, n) {
					(this.previousValue = t),
						(this.currentValue = e),
						(this.firstChange = n);
				}
				isFirstChange() {
					return this.firstChange;
				}
			}
			function vt() {
				return wt;
			}
			function wt(t) {
				return t.type.prototype.ngOnChanges && (t.setInput = Et), St;
			}
			function St() {
				const t = Ct(this),
					e = null == t ? void 0 : t.current;
				if (e) {
					const n = t.previous;
					if (n === q) t.previous = e;
					else for (let t in e) n[t] = e[t];
					(t.current = null), this.ngOnChanges(e);
				}
			}
			function Et(t, e, n, r) {
				const s =
						Ct(t) ||
						(function (t, e) {
							return (t.__ngSimpleChanges__ = e);
						})(t, { previous: q, current: null }),
					i = s.current || (s.current = {}),
					o = s.previous,
					a = this.declaredInputs[n],
					l = o[a];
				(i[a] = new bt(l && l.currentValue, e, o === q)), (t[r] = e);
			}
			function Ct(t) {
				return t.__ngSimpleChanges__ || null;
			}
			let Tt;
			function xt(t) {
				Tt = t;
			}
			function Ot(t) {
				return !!t.listen;
			}
			vt.ngInherit = !0;
			const kt = {
				createRenderer: (t, e) =>
					void 0 !== Tt
						? Tt
						: 'undefined' != typeof document
						? document
						: void 0
			};
			function At(t) {
				for (; Array.isArray(t); ) t = t[0];
				return t;
			}
			function It(t, e) {
				return At(e[t.index]);
			}
			function jt(t, e) {
				return t.data[e];
			}
			function Rt(t, e) {
				const n = e[t];
				return dt(n) ? n : n[0];
			}
			function Pt(t) {
				const e = (function (t) {
					return t.__ngContext__ || null;
				})(t);
				return e ? (Array.isArray(e) ? e : e.lView) : null;
			}
			function Nt(t) {
				return 4 == (4 & t[2]);
			}
			function Dt(t) {
				return 128 == (128 & t[2]);
			}
			function Ft(t, e) {
				return null == e ? null : t[e];
			}
			function Lt(t) {
				t[18] = 0;
			}
			function Mt(t, e) {
				t[5] += e;
				let n = t,
					r = t[3];
				for (
					;
					null !== r &&
					((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

				)
					(r[5] += e), (n = r), (r = r[3]);
			}
			const Ut = {
				lFrame: se(null),
				bindingsEnabled: !0,
				isInCheckNoChangesMode: !1
			};
			function Ht() {
				return Ut.bindingsEnabled;
			}
			function $t() {
				return Ut.lFrame.lView;
			}
			function zt() {
				return Ut.lFrame.tView;
			}
			function qt() {
				let t = Vt();
				for (; null !== t && 64 === t.type; ) t = t.parent;
				return t;
			}
			function Vt() {
				return Ut.lFrame.currentTNode;
			}
			function Bt(t, e) {
				const n = Ut.lFrame;
				(n.currentTNode = t), (n.isParent = e);
			}
			function Qt() {
				return Ut.lFrame.isParent;
			}
			function Wt() {
				return Ut.isInCheckNoChangesMode;
			}
			function Zt(t) {
				Ut.isInCheckNoChangesMode = t;
			}
			function Gt() {
				return Ut.lFrame.bindingIndex++;
			}
			function Kt(t, e) {
				const n = Ut.lFrame;
				(n.bindingIndex = n.bindingRootIndex = t), Jt(e);
			}
			function Jt(t) {
				Ut.lFrame.currentDirectiveIndex = t;
			}
			function Xt() {
				return Ut.lFrame.currentQueryIndex;
			}
			function Yt(t) {
				Ut.lFrame.currentQueryIndex = t;
			}
			function te(t) {
				const e = t[1];
				return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
			}
			function ee(t, e, n) {
				if (n & j.SkipSelf) {
					let r = e,
						s = t;
					for (
						;
						(r = r.parent),
							!(
								null !== r ||
								n & j.Host ||
								((r = te(s)), null === r) ||
								((s = s[15]), 10 & r.type)
							);

					);
					if (null === r) return !1;
					(e = r), (t = s);
				}
				const r = (Ut.lFrame = re());
				return (r.currentTNode = e), (r.lView = t), !0;
			}
			function ne(t) {
				const e = re(),
					n = t[1];
				(Ut.lFrame = e),
					(e.currentTNode = n.firstChild),
					(e.lView = t),
					(e.tView = n),
					(e.contextLView = t),
					(e.bindingIndex = n.bindingStartIndex),
					(e.inI18n = !1);
			}
			function re() {
				const t = Ut.lFrame,
					e = null === t ? null : t.child;
				return null === e ? se(t) : e;
			}
			function se(t) {
				const e = {
					currentTNode: null,
					isParent: !0,
					lView: null,
					tView: null,
					selectedIndex: -1,
					contextLView: null,
					elementDepthCount: 0,
					currentNamespace: null,
					currentDirectiveIndex: -1,
					bindingRootIndex: -1,
					bindingIndex: -1,
					currentQueryIndex: 0,
					parent: t,
					child: null,
					inI18n: !1
				};
				return null !== t && (t.child = e), e;
			}
			function ie() {
				const t = Ut.lFrame;
				return (
					(Ut.lFrame = t.parent),
					(t.currentTNode = null),
					(t.lView = null),
					t
				);
			}
			const oe = ie;
			function ae() {
				const t = ie();
				(t.isParent = !0),
					(t.tView = null),
					(t.selectedIndex = -1),
					(t.contextLView = null),
					(t.elementDepthCount = 0),
					(t.currentDirectiveIndex = -1),
					(t.currentNamespace = null),
					(t.bindingRootIndex = -1),
					(t.bindingIndex = -1),
					(t.currentQueryIndex = 0);
			}
			function le(t) {
				Ut.lFrame.selectedIndex = t;
			}
			function ce() {
				const t = Ut.lFrame;
				return jt(t.tView, t.selectedIndex);
			}
			function ue(t, e) {
				for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
					const e = t.data[n].type.prototype,
						{
							ngAfterContentInit: r,
							ngAfterContentChecked: s,
							ngAfterViewInit: i,
							ngAfterViewChecked: o,
							ngOnDestroy: a
						} = e;
					r && (t.contentHooks || (t.contentHooks = [])).push(-n, r),
						s &&
							((t.contentHooks || (t.contentHooks = [])).push(
								n,
								s
							),
							(
								t.contentCheckHooks ||
								(t.contentCheckHooks = [])
							).push(n, s)),
						i && (t.viewHooks || (t.viewHooks = [])).push(-n, i),
						o &&
							((t.viewHooks || (t.viewHooks = [])).push(n, o),
							(t.viewCheckHooks || (t.viewCheckHooks = [])).push(
								n,
								o
							)),
						null != a &&
							(t.destroyHooks || (t.destroyHooks = [])).push(
								n,
								a
							);
				}
			}
			function he(t, e, n) {
				pe(t, e, 3, n);
			}
			function de(t, e, n, r) {
				(3 & t[2]) === n && pe(t, e, n, r);
			}
			function fe(t, e) {
				let n = t[2];
				(3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
			}
			function pe(t, e, n, r) {
				const s = null != r ? r : -1,
					i = e.length - 1;
				let o = 0;
				for (let a = void 0 !== r ? 65535 & t[18] : 0; a < i; a++)
					if ('number' == typeof e[a + 1]) {
						if (((o = e[a]), null != r && o >= r)) break;
					} else
						e[a] < 0 && (t[18] += 65536),
							(o < s || -1 == s) &&
								(me(t, n, e, a),
								(t[18] = (4294901760 & t[18]) + a + 2)),
							a++;
			}
			function me(t, e, n, r) {
				const s = n[r] < 0,
					i = n[r + 1],
					o = t[s ? -n[r] : n[r]];
				s
					? t[2] >> 11 < t[18] >> 16 &&
					  (3 & t[2]) === e &&
					  ((t[2] += 2048), i.call(o))
					: i.call(o);
			}
			const ge = -1;
			class ye {
				constructor(t, e, n) {
					(this.factory = t),
						(this.resolving = !1),
						(this.canSeeViewProviders = e),
						(this.injectImpl = n);
				}
			}
			function _e(t, e, n) {
				const r = Ot(t);
				let s = 0;
				for (; s < n.length; ) {
					const i = n[s];
					if ('number' == typeof i) {
						if (0 !== i) break;
						s++;
						const o = n[s++],
							a = n[s++],
							l = n[s++];
						r
							? t.setAttribute(e, a, l, o)
							: e.setAttributeNS(o, a, l);
					} else {
						const o = i,
							a = n[++s];
						ve(o)
							? r && t.setProperty(e, o, a)
							: r
							? t.setAttribute(e, o, a)
							: e.setAttribute(o, a),
							s++;
					}
				}
				return s;
			}
			function be(t) {
				return 3 === t || 4 === t || 6 === t;
			}
			function ve(t) {
				return 64 === t.charCodeAt(0);
			}
			function we(t, e) {
				if (null === e || 0 === e.length);
				else if (null === t || 0 === t.length) t = e.slice();
				else {
					let n = -1;
					for (let r = 0; r < e.length; r++) {
						const s = e[r];
						'number' == typeof s
							? (n = s)
							: 0 === n ||
							  Se(
									t,
									n,
									s,
									null,
									-1 === n || 2 === n ? e[++r] : null
							  );
					}
				}
				return t;
			}
			function Se(t, e, n, r, s) {
				let i = 0,
					o = t.length;
				if (-1 === e) o = -1;
				else
					for (; i < t.length; ) {
						const n = t[i++];
						if ('number' == typeof n) {
							if (n === e) {
								o = -1;
								break;
							}
							if (n > e) {
								o = i - 1;
								break;
							}
						}
					}
				for (; i < t.length; ) {
					const e = t[i];
					if ('number' == typeof e) break;
					if (e === n) {
						if (null === r)
							return void (null !== s && (t[i + 1] = s));
						if (r === t[i + 1]) return void (t[i + 2] = s);
					}
					i++, null !== r && i++, null !== s && i++;
				}
				-1 !== o && (t.splice(o, 0, e), (i = o + 1)),
					t.splice(i++, 0, n),
					null !== r && t.splice(i++, 0, r),
					null !== s && t.splice(i++, 0, s);
			}
			function Ee(t) {
				return t !== ge;
			}
			function Ce(t) {
				return 32767 & t;
			}
			function Te(t, e) {
				let n = t >> 16,
					r = e;
				for (; n > 0; ) (r = r[15]), n--;
				return r;
			}
			let xe = !0;
			function Oe(t) {
				const e = xe;
				return (xe = t), e;
			}
			let ke = 0;
			function Ae(t, e) {
				const n = je(t, e);
				if (-1 !== n) return n;
				const r = e[1];
				r.firstCreatePass &&
					((t.injectorIndex = e.length),
					Ie(r.data, t),
					Ie(e, null),
					Ie(r.blueprint, null));
				const s = Re(t, e),
					i = t.injectorIndex;
				if (Ee(s)) {
					const t = Ce(s),
						n = Te(s, e),
						r = n[1].data;
					for (let s = 0; s < 8; s++) e[i + s] = n[t + s] | r[t + s];
				}
				return (e[i + 8] = s), i;
			}
			function Ie(t, e) {
				t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
			}
			function je(t, e) {
				return -1 === t.injectorIndex ||
					(t.parent && t.parent.injectorIndex === t.injectorIndex) ||
					null === e[t.injectorIndex + 8]
					? -1
					: t.injectorIndex;
			}
			function Re(t, e) {
				if (t.parent && -1 !== t.parent.injectorIndex)
					return t.parent.injectorIndex;
				let n = 0,
					r = null,
					s = e;
				for (; null !== s; ) {
					const t = s[1],
						e = t.type;
					if (
						((r = 2 === e ? t.declTNode : 1 === e ? s[6] : null),
						null === r)
					)
						return ge;
					if ((n++, (s = s[15]), -1 !== r.injectorIndex))
						return r.injectorIndex | (n << 16);
				}
				return ge;
			}
			function Pe(t, e, n) {
				!(function (t, e, n) {
					let r;
					'string' == typeof n
						? (r = n.charCodeAt(0) || 0)
						: n.hasOwnProperty(J) && (r = n[J]),
						null == r && (r = n[J] = ke++);
					const s = 255 & r;
					e.data[t + (s >> 5)] |= 1 << s;
				})(t, e, n);
			}
			function Ne(t, e, n) {
				if (n & j.Optional) return t;
				w(e, 'NodeInjector');
			}
			function De(t, e, n, r) {
				if (
					(n & j.Optional && void 0 === r && (r = null),
					0 == (n & (j.Self | j.Host)))
				) {
					const s = t[9],
						i = P(void 0);
					try {
						return s
							? s.get(e, r, n & j.Optional)
							: N(e, r, n & j.Optional);
					} finally {
						P(i);
					}
				}
				return Ne(r, e, n);
			}
			function Fe(t, e, n, r = j.Default, s) {
				if (null !== t) {
					const i = (function (t) {
						if ('string' == typeof t) return t.charCodeAt(0) || 0;
						const e = t.hasOwnProperty(J) ? t[J] : void 0;
						return 'number' == typeof e
							? e >= 0
								? 255 & e
								: Me
							: e;
					})(n);
					if ('function' == typeof i) {
						if (!ee(e, t, r))
							return r & j.Host ? Ne(s, n, r) : De(e, n, r, s);
						try {
							const t = i();
							if (null != t || r & j.Optional) return t;
							w(n);
						} finally {
							oe();
						}
					} else if ('number' == typeof i) {
						let s = null,
							o = je(t, e),
							a = ge,
							l = r & j.Host ? e[16][6] : null;
						for (
							(-1 === o || r & j.SkipSelf) &&
							((a = -1 === o ? Re(t, e) : e[o + 8]),
							a !== ge && qe(r, !1)
								? ((s = e[1]), (o = Ce(a)), (e = Te(a, e)))
								: (o = -1));
							-1 !== o;

						) {
							const t = e[1];
							if (ze(i, o, t.data)) {
								const t = Ue(o, e, n, s, r, l);
								if (t !== Le) return t;
							}
							(a = e[o + 8]),
								a !== ge &&
								qe(r, e[1].data[o + 8] === l) &&
								ze(i, o, e)
									? ((s = t), (o = Ce(a)), (e = Te(a, e)))
									: (o = -1);
						}
					}
				}
				return De(e, n, r, s);
			}
			const Le = {};
			function Me() {
				return new Ve(qt(), $t());
			}
			function Ue(t, e, n, r, s, i) {
				const o = e[1],
					a = o.data[t + 8],
					l = He(
						a,
						o,
						n,
						null == r ? mt(a) && xe : r != o && 0 != (3 & a.type),
						s & j.Host && i === a
					);
				return null !== l ? $e(e, o, l, a) : Le;
			}
			function He(t, e, n, r, s) {
				const i = t.providerIndexes,
					o = e.data,
					a = 1048575 & i,
					l = t.directiveStart,
					c = i >> 20,
					u = s ? a + c : t.directiveEnd;
				for (let h = r ? a : a + c; h < u; h++) {
					const t = o[h];
					if ((h < l && n === t) || (h >= l && t.type === n))
						return h;
				}
				if (s) {
					const t = o[l];
					if (t && yt(t) && t.type === n) return l;
				}
				return null;
			}
			function $e(t, e, n, r) {
				let s = t[n];
				const i = e.data;
				if (s instanceof ye) {
					const o = s;
					o.resolving &&
						(function (t, e) {
							throw new _(
								'200',
								`Circular dependency in DI detected for ${t}`
							);
						})(v(i[n]));
					const a = Oe(o.canSeeViewProviders);
					o.resolving = !0;
					const l = o.injectImpl ? P(o.injectImpl) : null;
					ee(t, r, j.Default);
					try {
						(s = t[n] = o.factory(void 0, i, t, r)),
							e.firstCreatePass &&
								n >= r.directiveStart &&
								(function (t, e, n) {
									const {
										ngOnChanges: r,
										ngOnInit: s,
										ngDoCheck: i
									} = e.type.prototype;
									if (r) {
										const r = wt(e);
										(
											n.preOrderHooks ||
											(n.preOrderHooks = [])
										).push(t, r),
											(
												n.preOrderCheckHooks ||
												(n.preOrderCheckHooks = [])
											).push(t, r);
									}
									s &&
										(
											n.preOrderHooks ||
											(n.preOrderHooks = [])
										).push(0 - t, s),
										i &&
											((
												n.preOrderHooks ||
												(n.preOrderHooks = [])
											).push(t, i),
											(
												n.preOrderCheckHooks ||
												(n.preOrderCheckHooks = [])
											).push(t, i));
								})(n, i[n], e);
					} finally {
						null !== l && P(l), Oe(a), (o.resolving = !1), oe();
					}
				}
				return s;
			}
			function ze(t, e, n) {
				return !!(n[e + (t >> 5)] & (1 << t));
			}
			function qe(t, e) {
				return !(t & j.Self || (t & j.Host && e));
			}
			class Ve {
				constructor(t, e) {
					(this._tNode = t), (this._lView = e);
				}
				get(t, e) {
					return Fe(this._tNode, this._lView, t, void 0, e);
				}
			}
			function Be(t) {
				return (function (t, e) {
					if ('class' === e) return t.classes;
					if ('style' === e) return t.styles;
					const n = t.attrs;
					if (n) {
						const t = n.length;
						let r = 0;
						for (; r < t; ) {
							const s = n[r];
							if (be(s)) break;
							if (0 === s) r += 2;
							else if ('number' == typeof s)
								for (r++; r < t && 'string' == typeof n[r]; )
									r++;
							else {
								if (s === e) return n[r + 1];
								r += 2;
							}
						}
					}
					return null;
				})(qt(), t);
			}
			const Qe = '__parameters__';
			function We(t, e, n) {
				return D(() => {
					const r = (function (t) {
						return function (...e) {
							if (t) {
								const n = t(...e);
								for (const t in n) this[t] = n[t];
							}
						};
					})(e);
					function s(...t) {
						if (this instanceof s) return r.apply(this, t), this;
						const e = new s(...t);
						return (n.annotation = e), n;
						function n(t, n, r) {
							const s = t.hasOwnProperty(Qe)
								? t[Qe]
								: Object.defineProperty(t, Qe, { value: [] })[
										Qe
								  ];
							for (; s.length <= r; ) s.push(null);
							return (s[r] = s[r] || []).push(e), t;
						}
					}
					return (
						n && (s.prototype = Object.create(n.prototype)),
						(s.prototype.ngMetadataName = t),
						(s.annotationCls = s),
						s
					);
				});
			}
			class Ze {
				constructor(t, e) {
					(this._desc = t),
						(this.ngMetadataName = 'InjectionToken'),
						(this.ɵprov = void 0),
						'number' == typeof e
							? (this.__NG_ELEMENT_ID__ = e)
							: void 0 !== e &&
							  (this.ɵprov = S({
									token: this,
									providedIn: e.providedIn || 'root',
									factory: e.factory
							  }));
				}
				toString() {
					return `InjectionToken ${this._desc}`;
				}
			}
			const Ge = new Ze('AnalyzeForEntryComponents'),
				Ke = Function;
			function Je(t, e) {
				void 0 === e && (e = t);
				for (let n = 0; n < t.length; n++) {
					let r = t[n];
					Array.isArray(r)
						? (e === t && (e = t.slice(0, n)), Je(r, e))
						: e !== t && e.push(r);
				}
				return e;
			}
			function Xe(t, e) {
				t.forEach((t) => (Array.isArray(t) ? Xe(t, e) : e(t)));
			}
			function Ye(t, e, n) {
				e >= t.length ? t.push(n) : t.splice(e, 0, n);
			}
			function tn(t, e) {
				return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
			}
			const en = {},
				nn = /\n/gm,
				rn = '__source',
				sn = d({ provide: String, useValue: d });
			let on;
			function an(t) {
				const e = on;
				return (on = t), e;
			}
			function ln(t, e = j.Default) {
				if (void 0 === on)
					throw new Error(
						'inject() must be called from an injection context'
					);
				return null === on
					? N(t, void 0, e)
					: on.get(t, e & j.Optional ? null : void 0, e);
			}
			function cn(t, e = j.Default) {
				return (R || ln)(y(t), e);
			}
			function un(t) {
				const e = [];
				for (let n = 0; n < t.length; n++) {
					const r = y(t[n]);
					if (Array.isArray(r)) {
						if (0 === r.length)
							throw new Error(
								'Arguments array must have arguments.'
							);
						let t,
							n = j.Default;
						for (let e = 0; e < r.length; e++) {
							const s = r[e],
								i = s.__NG_DI_FLAG__;
							'number' == typeof i
								? -1 === i
									? (t = s.token)
									: (n |= i)
								: (t = s);
						}
						e.push(cn(t, n));
					} else e.push(cn(r));
				}
				return e;
			}
			function hn(t, e) {
				return (
					(t.__NG_DI_FLAG__ = e), (t.prototype.__NG_DI_FLAG__ = e), t
				);
			}
			const dn = hn(
					We('Inject', (t) => ({ token: t })),
					-1
				),
				fn = hn(We('Optional'), 8),
				pn = hn(We('SkipSelf'), 4);
			let mn;
			function gn(t) {
				var e;
				return (
					(null ===
						(e = (function () {
							if (void 0 === mn && ((mn = null), z.trustedTypes))
								try {
									mn = z.trustedTypes.createPolicy(
										'angular',
										{
											createHTML: (t) => t,
											createScript: (t) => t,
											createScriptURL: (t) => t
										}
									);
								} catch (e) {}
							return mn;
						})()) || void 0 === e
						? void 0
						: e.createHTML(t)) || t
				);
			}
			class yn {
				constructor(t) {
					this.changingThisBreaksApplicationSecurity = t;
				}
				toString() {
					return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
				}
			}
			class _n extends yn {
				getTypeName() {
					return 'HTML';
				}
			}
			class bn extends yn {
				getTypeName() {
					return 'Style';
				}
			}
			class vn extends yn {
				getTypeName() {
					return 'Script';
				}
			}
			class wn extends yn {
				getTypeName() {
					return 'URL';
				}
			}
			class Sn extends yn {
				getTypeName() {
					return 'ResourceURL';
				}
			}
			function En(t) {
				return t instanceof yn
					? t.changingThisBreaksApplicationSecurity
					: t;
			}
			function Cn(t, e) {
				const n = Tn(t);
				if (null != n && n !== e) {
					if ('ResourceURL' === n && 'URL' === e) return !0;
					throw new Error(
						`Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`
					);
				}
				return n === e;
			}
			function Tn(t) {
				return (t instanceof yn && t.getTypeName()) || null;
			}
			function xn(t) {
				return new _n(t);
			}
			function On(t) {
				return new bn(t);
			}
			function kn(t) {
				return new vn(t);
			}
			function An(t) {
				return new wn(t);
			}
			function In(t) {
				return new Sn(t);
			}
			class jn {
				constructor(t) {
					this.inertDocumentHelper = t;
				}
				getInertBodyElement(t) {
					t = '<body><remove></remove>' + t;
					try {
						const e = new window.DOMParser().parseFromString(
							gn(t),
							'text/html'
						).body;
						return null === e
							? this.inertDocumentHelper.getInertBodyElement(t)
							: (e.removeChild(e.firstChild), e);
					} catch (e) {
						return null;
					}
				}
			}
			class Rn {
				constructor(t) {
					if (
						((this.defaultDoc = t),
						(this.inertDocument = this.defaultDoc.implementation.createHTMLDocument(
							'sanitization-inert'
						)),
						null == this.inertDocument.body)
					) {
						const t = this.inertDocument.createElement('html');
						this.inertDocument.appendChild(t);
						const e = this.inertDocument.createElement('body');
						t.appendChild(e);
					}
				}
				getInertBodyElement(t) {
					const e = this.inertDocument.createElement('template');
					if ('content' in e) return (e.innerHTML = gn(t)), e;
					const n = this.inertDocument.createElement('body');
					return (
						(n.innerHTML = gn(t)),
						this.defaultDoc.documentMode &&
							this.stripCustomNsAttrs(n),
						n
					);
				}
				stripCustomNsAttrs(t) {
					const e = t.attributes;
					for (let r = e.length - 1; 0 < r; r--) {
						const n = e.item(r).name;
						('xmlns:ns1' !== n && 0 !== n.indexOf('ns1:')) ||
							t.removeAttribute(n);
					}
					let n = t.firstChild;
					for (; n; )
						n.nodeType === Node.ELEMENT_NODE &&
							this.stripCustomNsAttrs(n),
							(n = n.nextSibling);
				}
			}
			const Pn = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
				Nn = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
			function Dn(t) {
				return (t = String(t)).match(Pn) || t.match(Nn)
					? t
					: 'unsafe:' + t;
			}
			function Fn(t) {
				const e = {};
				for (const n of t.split(',')) e[n] = !0;
				return e;
			}
			function Ln(...t) {
				const e = {};
				for (const n of t)
					for (const t in n) n.hasOwnProperty(t) && (e[t] = !0);
				return e;
			}
			const Mn = Fn('area,br,col,hr,img,wbr'),
				Un = Fn('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
				Hn = Fn('rp,rt'),
				$n = Ln(Hn, Un),
				zn = Ln(
					Mn,
					Ln(
						Un,
						Fn(
							'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
						)
					),
					Ln(
						Hn,
						Fn(
							'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
						)
					),
					$n
				),
				qn = Fn(
					'background,cite,href,itemtype,longdesc,poster,src,xlink:href'
				),
				Vn = Fn('srcset'),
				Bn = Ln(
					qn,
					Vn,
					Fn(
						'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
					),
					Fn(
						'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
					)
				),
				Qn = Fn('script,style,template');
			class Wn {
				constructor() {
					(this.sanitizedSomething = !1), (this.buf = []);
				}
				sanitizeChildren(t) {
					let e = t.firstChild,
						n = !0;
					for (; e; )
						if (
							(e.nodeType === Node.ELEMENT_NODE
								? (n = this.startElement(e))
								: e.nodeType === Node.TEXT_NODE
								? this.chars(e.nodeValue)
								: (this.sanitizedSomething = !0),
							n && e.firstChild)
						)
							e = e.firstChild;
						else
							for (; e; ) {
								e.nodeType === Node.ELEMENT_NODE &&
									this.endElement(e);
								let t = this.checkClobberedElement(
									e,
									e.nextSibling
								);
								if (t) {
									e = t;
									break;
								}
								e = this.checkClobberedElement(e, e.parentNode);
							}
					return this.buf.join('');
				}
				startElement(t) {
					const e = t.nodeName.toLowerCase();
					if (!zn.hasOwnProperty(e))
						return (
							(this.sanitizedSomething = !0),
							!Qn.hasOwnProperty(e)
						);
					this.buf.push('<'), this.buf.push(e);
					const n = t.attributes;
					for (let s = 0; s < n.length; s++) {
						const t = n.item(s),
							e = t.name,
							i = e.toLowerCase();
						if (!Bn.hasOwnProperty(i)) {
							this.sanitizedSomething = !0;
							continue;
						}
						let o = t.value;
						qn[i] && (o = Dn(o)),
							Vn[i] &&
								((r = o),
								(o = (r = String(r))
									.split(',')
									.map((t) => Dn(t.trim()))
									.join(', '))),
							this.buf.push(' ', e, '="', Kn(o), '"');
					}
					var r;
					return this.buf.push('>'), !0;
				}
				endElement(t) {
					const e = t.nodeName.toLowerCase();
					zn.hasOwnProperty(e) &&
						!Mn.hasOwnProperty(e) &&
						(this.buf.push('</'),
						this.buf.push(e),
						this.buf.push('>'));
				}
				chars(t) {
					this.buf.push(Kn(t));
				}
				checkClobberedElement(t, e) {
					if (
						e &&
						(t.compareDocumentPosition(e) &
							Node.DOCUMENT_POSITION_CONTAINED_BY) ===
							Node.DOCUMENT_POSITION_CONTAINED_BY
					)
						throw new Error(
							`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
						);
					return e;
				}
			}
			const Zn = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
				Gn = /([^\#-~ |!])/g;
			function Kn(t) {
				return t
					.replace(/&/g, '&amp;')
					.replace(Zn, function (t) {
						return (
							'&#' +
							(1024 * (t.charCodeAt(0) - 55296) +
								(t.charCodeAt(1) - 56320) +
								65536) +
							';'
						);
					})
					.replace(Gn, function (t) {
						return '&#' + t.charCodeAt(0) + ';';
					})
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;');
			}
			let Jn;
			function Xn(t, e) {
				let n = null;
				try {
					Jn =
						Jn ||
						(function (t) {
							const e = new Rn(t);
							return (function () {
								try {
									return !!new window.DOMParser().parseFromString(
										gn(''),
										'text/html'
									);
								} catch (t) {
									return !1;
								}
							})()
								? new jn(e)
								: e;
						})(t);
					let r = e ? String(e) : '';
					n = Jn.getInertBodyElement(r);
					let s = 5,
						i = r;
					do {
						if (0 === s)
							throw new Error(
								'Failed to sanitize html because the input is unstable'
							);
						s--,
							(r = i),
							(i = n.innerHTML),
							(n = Jn.getInertBodyElement(r));
					} while (r !== i);
					return gn(new Wn().sanitizeChildren(Yn(n) || n));
				} finally {
					if (n) {
						const t = Yn(n) || n;
						for (; t.firstChild; ) t.removeChild(t.firstChild);
					}
				}
			}
			function Yn(t) {
				return 'content' in t &&
					(function (t) {
						return (
							t.nodeType === Node.ELEMENT_NODE &&
							'TEMPLATE' === t.nodeName
						);
					})(t)
					? t.content
					: null;
			}
			var tr = (function (t) {
				return (
					(t[(t.NONE = 0)] = 'NONE'),
					(t[(t.HTML = 1)] = 'HTML'),
					(t[(t.STYLE = 2)] = 'STYLE'),
					(t[(t.SCRIPT = 3)] = 'SCRIPT'),
					(t[(t.URL = 4)] = 'URL'),
					(t[(t.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
					t
				);
			})({});
			function er(t) {
				const e = (function () {
					const t = $t();
					return t && t[12];
				})();
				return e
					? e.sanitize(tr.URL, t) || ''
					: Cn(t, 'URL')
					? En(t)
					: Dn(b(t));
			}
			function nr(t) {
				return t.ngDebugContext;
			}
			function rr(t) {
				return t.ngOriginalError;
			}
			function sr(t, ...e) {
				t.error(...e);
			}
			class ir {
				constructor() {
					this._console = console;
				}
				handleError(t) {
					const e = this._findOriginalError(t),
						n = this._findContext(t),
						r = (function (t) {
							return t.ngErrorLogger || sr;
						})(t);
					r(this._console, 'ERROR', t),
						e && r(this._console, 'ORIGINAL ERROR', e),
						n && r(this._console, 'ERROR CONTEXT', n);
				}
				_findContext(t) {
					return t
						? nr(t)
							? nr(t)
							: this._findContext(rr(t))
						: null;
				}
				_findOriginalError(t) {
					let e = rr(t);
					for (; e && rr(e); ) e = rr(e);
					return e;
				}
			}
			function or(t, e) {
				t.__ngContext__ = e;
			}
			const ar = (() =>
				(
					('undefined' != typeof requestAnimationFrame &&
						requestAnimationFrame) ||
					setTimeout
				).bind(z))();
			function lr(t) {
				return t instanceof Function ? t() : t;
			}
			var cr = (function (t) {
				return (
					(t[(t.Important = 1)] = 'Important'),
					(t[(t.DashCase = 2)] = 'DashCase'),
					t
				);
			})({});
			function ur(t, e) {
				return (void 0)(t, e);
			}
			function hr(t) {
				const e = t[3];
				return ft(e) ? e[3] : e;
			}
			function dr(t) {
				return pr(t[13]);
			}
			function fr(t) {
				return pr(t[4]);
			}
			function pr(t) {
				for (; null !== t && !ft(t); ) t = t[4];
				return t;
			}
			function mr(t, e, n, r, s) {
				if (null != r) {
					let i,
						o = !1;
					ft(r) ? (i = r) : dt(r) && ((o = !0), (r = r[0]));
					const a = At(r);
					0 === t && null !== n
						? null == s
							? Sr(e, n, a)
							: wr(e, n, a, s || null, !0)
						: 1 === t && null !== n
						? wr(e, n, a, s || null, !0)
						: 2 === t
						? (function (t, e, n) {
								const r = Cr(t, e);
								r &&
									(function (t, e, n, r) {
										Ot(t)
											? t.removeChild(e, n, r)
											: e.removeChild(n);
									})(t, r, e, n);
						  })(e, a, o)
						: 3 === t && e.destroyNode(a),
						null != i &&
							(function (t, e, n, r, s) {
								const i = n[7];
								i !== At(n) && mr(e, t, r, i, s);
								for (let o = ht; o < n.length; o++) {
									const s = n[o];
									Ir(s[1], s, t, e, r, i);
								}
							})(e, t, i, n, s);
				}
			}
			function gr(t, e, n) {
				return Ot(t)
					? t.createElement(e, n)
					: null === n
					? t.createElement(e)
					: t.createElementNS(n, e);
			}
			function yr(t, e) {
				const n = t[9],
					r = n.indexOf(e),
					s = e[3];
				1024 & e[2] && ((e[2] &= -1025), Mt(s, -1)), n.splice(r, 1);
			}
			function _r(t, e) {
				if (t.length <= ht) return;
				const n = ht + e,
					r = t[n];
				if (r) {
					const i = r[17];
					null !== i && i !== t && yr(i, r),
						e > 0 && (t[n - 1][4] = r[4]);
					const o = tn(t, ht + e);
					Ir(r[1], (s = r), s[11], 2, null, null),
						(s[0] = null),
						(s[6] = null);
					const a = o[19];
					null !== a && a.detachView(o[1]),
						(r[3] = null),
						(r[4] = null),
						(r[2] &= -129);
				}
				var s;
				return r;
			}
			function br(t, e) {
				if (!(256 & e[2])) {
					const n = e[11];
					Ot(n) && n.destroyNode && Ir(t, e, n, 3, null, null),
						(function (t) {
							let e = t[13];
							if (!e) return vr(t[1], t);
							for (; e; ) {
								let n = null;
								if (dt(e)) n = e[13];
								else {
									const t = e[10];
									t && (n = t);
								}
								if (!n) {
									for (; e && !e[4] && e !== t; )
										dt(e) && vr(e[1], e), (e = e[3]);
									null === e && (e = t),
										dt(e) && vr(e[1], e),
										(n = e && e[4]);
								}
								e = n;
							}
						})(e);
				}
			}
			function vr(t, e) {
				if (!(256 & e[2])) {
					(e[2] &= -129),
						(e[2] |= 256),
						(function (t, e) {
							let n;
							if (null != t && null != (n = t.destroyHooks))
								for (let r = 0; r < n.length; r += 2) {
									const t = e[n[r]];
									if (!(t instanceof ye)) {
										const e = n[r + 1];
										if (Array.isArray(e))
											for (
												let n = 0;
												n < e.length;
												n += 2
											)
												e[n + 1].call(t[e[n]]);
										else e.call(t);
									}
								}
						})(t, e),
						(function (t, e) {
							const n = t.cleanup,
								r = e[7];
							let s = -1;
							if (null !== n)
								for (let i = 0; i < n.length - 1; i += 2)
									if ('string' == typeof n[i]) {
										const t = n[i + 1],
											o =
												'function' == typeof t
													? t(e)
													: At(e[t]),
											a = r[(s = n[i + 2])],
											l = n[i + 3];
										'boolean' == typeof l
											? o.removeEventListener(n[i], a, l)
											: l >= 0
											? r[(s = l)]()
											: r[(s = -l)].unsubscribe(),
											(i += 2);
									} else {
										const t = r[(s = n[i + 1])];
										n[i].call(t);
									}
							if (null !== r) {
								for (let t = s + 1; t < r.length; t++)
									(0, r[t])();
								e[7] = null;
							}
						})(t, e),
						1 === e[1].type && Ot(e[11]) && e[11].destroy();
					const n = e[17];
					if (null !== n && ft(e[3])) {
						n !== e[3] && yr(n, e);
						const r = e[19];
						null !== r && r.detachView(t);
					}
				}
			}
			function wr(t, e, n, r, s) {
				Ot(t) ? t.insertBefore(e, n, r, s) : e.insertBefore(n, r, s);
			}
			function Sr(t, e, n) {
				Ot(t) ? t.appendChild(e, n) : e.appendChild(n);
			}
			function Er(t, e, n, r, s) {
				null !== r ? wr(t, e, n, r, s) : Sr(t, e, n);
			}
			function Cr(t, e) {
				return Ot(t) ? t.parentNode(e) : e.parentNode;
			}
			function Tr(t, e, n, r) {
				const s = (function (t, e, n) {
						return (function (t, e, n) {
							let r = e;
							for (; null !== r && 40 & r.type; )
								r = (e = r).parent;
							if (null === r) return n[0];
							if (2 & r.flags) {
								const e =
									t.data[r.directiveStart].encapsulation;
								if (e === L.None || e === L.Emulated)
									return null;
							}
							return It(r, n);
						})(t, e.parent, n);
					})(t, r, e),
					i = e[11],
					o = (function (t, e, n) {
						return (function (t, e, n) {
							return 40 & t.type ? It(t, n) : null;
						})(t, 0, n);
					})(r.parent || e[6], 0, e);
				if (null != s)
					if (Array.isArray(n))
						for (let a = 0; a < n.length; a++)
							Er(i, s, n[a], o, !1);
					else Er(i, s, n, o, !1);
			}
			function xr(t, e) {
				if (null !== e) {
					const n = e.type;
					if (3 & n) return It(e, t);
					if (4 & n) return kr(-1, t[e.index]);
					if (8 & n) {
						const n = e.child;
						if (null !== n) return xr(t, n);
						{
							const n = t[e.index];
							return ft(n) ? kr(-1, n) : At(n);
						}
					}
					if (32 & n) return ur(e, t)() || At(t[e.index]);
					{
						const n = Or(t, e);
						return null !== n
							? Array.isArray(n)
								? n[0]
								: xr(hr(t[16]), n)
							: xr(t, e.next);
					}
				}
				return null;
			}
			function Or(t, e) {
				return null !== e ? t[16][6].projection[e.projection] : null;
			}
			function kr(t, e) {
				const n = ht + t + 1;
				if (n < e.length) {
					const t = e[n],
						r = t[1].firstChild;
					if (null !== r) return xr(t, r);
				}
				return e[7];
			}
			function Ar(t, e, n, r, s, i, o) {
				for (; null != n; ) {
					const a = r[n.index],
						l = n.type;
					if (
						(o && 0 === e && (a && or(At(a), r), (n.flags |= 4)),
						64 != (64 & n.flags))
					)
						if (8 & l)
							Ar(t, e, n.child, r, s, i, !1), mr(e, t, s, a, i);
						else if (32 & l) {
							const o = ur(n, r);
							let l;
							for (; (l = o()); ) mr(e, t, s, l, i);
							mr(e, t, s, a, i);
						} else
							16 & l ? jr(t, e, r, n, s, i) : mr(e, t, s, a, i);
					n = o ? n.projectionNext : n.next;
				}
			}
			function Ir(t, e, n, r, s, i) {
				Ar(n, r, t.firstChild, e, s, i, !1);
			}
			function jr(t, e, n, r, s, i) {
				const o = n[16],
					a = o[6].projection[r.projection];
				if (Array.isArray(a))
					for (let l = 0; l < a.length; l++) mr(e, t, s, a[l], i);
				else Ar(t, e, a, o[3], s, i, !0);
			}
			function Rr(t, e, n) {
				Ot(t) ? t.setAttribute(e, 'style', n) : (e.style.cssText = n);
			}
			function Pr(t, e, n) {
				Ot(t)
					? '' === n
						? t.removeAttribute(e, 'class')
						: t.setAttribute(e, 'class', n)
					: (e.className = n);
			}
			function Nr(t, e, n) {
				let r = t.length;
				for (;;) {
					const s = t.indexOf(e, n);
					if (-1 === s) return s;
					if (0 === s || t.charCodeAt(s - 1) <= 32) {
						const n = e.length;
						if (s + n === r || t.charCodeAt(s + n) <= 32) return s;
					}
					n = s + 1;
				}
			}
			const Dr = 'ng-template';
			function Fr(t, e, n) {
				let r = 0;
				for (; r < t.length; ) {
					let s = t[r++];
					if (n && 'class' === s) {
						if (((s = t[r]), -1 !== Nr(s.toLowerCase(), e, 0)))
							return !0;
					} else if (1 === s) {
						for (
							;
							r < t.length && 'string' == typeof (s = t[r++]);

						)
							if (s.toLowerCase() === e) return !0;
						return !1;
					}
				}
				return !1;
			}
			function Lr(t) {
				return 4 === t.type && t.value !== Dr;
			}
			function Mr(t, e, n) {
				return e === (4 !== t.type || n ? t.value : Dr);
			}
			function Ur(t, e, n) {
				let r = 4;
				const s = t.attrs || [],
					i = (function (t) {
						for (let e = 0; e < t.length; e++)
							if (be(t[e])) return e;
						return t.length;
					})(s);
				let o = !1;
				for (let a = 0; a < e.length; a++) {
					const l = e[a];
					if ('number' != typeof l) {
						if (!o)
							if (4 & r) {
								if (
									((r = 2 | (1 & r)),
									('' !== l && !Mr(t, l, n)) ||
										('' === l && 1 === e.length))
								) {
									if (Hr(r)) return !1;
									o = !0;
								}
							} else {
								const c = 8 & r ? l : e[++a];
								if (8 & r && null !== t.attrs) {
									if (!Fr(t.attrs, c, n)) {
										if (Hr(r)) return !1;
										o = !0;
									}
									continue;
								}
								const u = $r(8 & r ? 'class' : l, s, Lr(t), n);
								if (-1 === u) {
									if (Hr(r)) return !1;
									o = !0;
									continue;
								}
								if ('' !== c) {
									let t;
									t = u > i ? '' : s[u + 1].toLowerCase();
									const e = 8 & r ? t : null;
									if (
										(e && -1 !== Nr(e, c, 0)) ||
										(2 & r && c !== t)
									) {
										if (Hr(r)) return !1;
										o = !0;
									}
								}
							}
					} else {
						if (!o && !Hr(r) && !Hr(l)) return !1;
						if (o && Hr(l)) continue;
						(o = !1), (r = l | (1 & r));
					}
				}
				return Hr(r) || o;
			}
			function Hr(t) {
				return 0 == (1 & t);
			}
			function $r(t, e, n, r) {
				if (null === e) return -1;
				let s = 0;
				if (r || !n) {
					let n = !1;
					for (; s < e.length; ) {
						const r = e[s];
						if (r === t) return s;
						if (3 === r || 6 === r) n = !0;
						else {
							if (1 === r || 2 === r) {
								let t = e[++s];
								for (; 'string' == typeof t; ) t = e[++s];
								continue;
							}
							if (4 === r) break;
							if (0 === r) {
								s += 4;
								continue;
							}
						}
						s += n ? 1 : 2;
					}
					return -1;
				}
				return (function (t, e) {
					let n = t.indexOf(4);
					if (n > -1)
						for (n++; n < t.length; ) {
							const r = t[n];
							if ('number' == typeof r) return -1;
							if (r === e) return n;
							n++;
						}
					return -1;
				})(e, t);
			}
			function zr(t, e, n = !1) {
				for (let r = 0; r < e.length; r++)
					if (Ur(t, e[r], n)) return !0;
				return !1;
			}
			function qr(t, e) {
				return t ? ':not(' + e.trim() + ')' : e;
			}
			function Vr(t) {
				let e = t[0],
					n = 1,
					r = 2,
					s = '',
					i = !1;
				for (; n < t.length; ) {
					let o = t[n];
					if ('string' == typeof o)
						if (2 & r) {
							const e = t[++n];
							s +=
								'[' +
								o +
								(e.length > 0 ? '="' + e + '"' : '') +
								']';
						} else 8 & r ? (s += '.' + o) : 4 & r && (s += ' ' + o);
					else
						'' === s || Hr(o) || ((e += qr(i, s)), (s = '')),
							(r = o),
							(i = i || !Hr(r));
					n++;
				}
				return '' !== s && (e += qr(i, s)), e;
			}
			const Br = {};
			function Qr(t, e) {
				const n = t.contentQueries;
				if (null !== n)
					for (let r = 0; r < n.length; r += 2) {
						const s = n[r],
							i = n[r + 1];
						if (-1 !== i) {
							const n = t.data[i];
							Yt(s), n.contentQueries(2, e[i], i);
						}
					}
			}
			function Wr(t, e, n, r, s, i, o, a, l, c) {
				const u = e.blueprint.slice();
				return (
					(u[0] = s),
					(u[2] = 140 | r),
					Lt(u),
					(u[3] = u[15] = t),
					(u[8] = n),
					(u[10] = o || (t && t[10])),
					(u[11] = a || (t && t[11])),
					(u[12] = l || (t && t[12]) || null),
					(u[9] = c || (t && t[9]) || null),
					(u[6] = i),
					(u[16] = 2 == e.type ? t[16] : u),
					u
				);
			}
			function Zr(t, e, n, r, s) {
				let i = t.data[e];
				if (null === i)
					(i = (function (t, e, n, r, s) {
						const i = Vt(),
							o = Qt(),
							a = (t.data[e] = (function (t, e, n, r, s, i) {
								return {
									type: n,
									index: r,
									insertBeforeIndex: null,
									injectorIndex: e ? e.injectorIndex : -1,
									directiveStart: -1,
									directiveEnd: -1,
									directiveStylingLast: -1,
									propertyBindings: null,
									flags: 0,
									providerIndexes: 0,
									value: s,
									attrs: i,
									mergedAttrs: null,
									localNames: null,
									initialInputs: void 0,
									inputs: null,
									outputs: null,
									tViews: null,
									next: null,
									projectionNext: null,
									child: null,
									parent: e,
									projection: null,
									styles: null,
									stylesWithoutHost: null,
									residualStyles: void 0,
									classes: null,
									classesWithoutHost: null,
									residualClasses: void 0,
									classBindings: 0,
									styleBindings: 0
								};
							})(0, o ? i : i && i.parent, n, e, r, s));
						return (
							null === t.firstChild && (t.firstChild = a),
							null !== i &&
								(o
									? null == i.child &&
									  null !== a.parent &&
									  (i.child = a)
									: null === i.next && (i.next = a)),
							a
						);
					})(t, e, n, r, s)),
						Ut.lFrame.inI18n && (i.flags |= 64);
				else if (64 & i.type) {
					(i.type = n), (i.value = r), (i.attrs = s);
					const t = (function () {
						const t = Ut.lFrame,
							e = t.currentTNode;
						return t.isParent ? e : e.parent;
					})();
					i.injectorIndex = null === t ? -1 : t.injectorIndex;
				}
				return Bt(i, !0), i;
			}
			function Gr(t, e, n, r) {
				if (0 === n) return -1;
				const s = e.length;
				for (let i = 0; i < n; i++)
					e.push(r), t.blueprint.push(r), t.data.push(null);
				return s;
			}
			function Kr(t, e, n) {
				ne(e);
				try {
					const r = t.viewQuery;
					null !== r && vs(1, r, n);
					const s = t.template;
					null !== s && Yr(t, e, s, 1, n),
						t.firstCreatePass && (t.firstCreatePass = !1),
						t.staticContentQueries && Qr(t, e),
						t.staticViewQueries && vs(2, t.viewQuery, n);
					const i = t.components;
					null !== i &&
						(function (t, e) {
							for (let n = 0; n < e.length; n++) ms(t, e[n]);
						})(e, i);
				} catch (r) {
					throw (
						(t.firstCreatePass && (t.incompleteFirstPass = !0), r)
					);
				} finally {
					(e[2] &= -5), ae();
				}
			}
			function Jr(t, e, n, r) {
				const s = e[2];
				if (256 == (256 & s)) return;
				ne(e);
				const i = Wt();
				try {
					Lt(e),
						(Ut.lFrame.bindingIndex = t.bindingStartIndex),
						null !== n && Yr(t, e, n, 2, r);
					const o = 3 == (3 & s);
					if (!i)
						if (o) {
							const n = t.preOrderCheckHooks;
							null !== n && he(e, n, null);
						} else {
							const n = t.preOrderHooks;
							null !== n && de(e, n, 0, null), fe(e, 0);
						}
					if (
						((function (t) {
							for (let e = dr(t); null !== e; e = fr(e)) {
								if (!e[2]) continue;
								const t = e[9];
								for (let e = 0; e < t.length; e++) {
									const n = t[e],
										r = n[3];
									0 == (1024 & n[2]) && Mt(r, 1),
										(n[2] |= 1024);
								}
							}
						})(e),
						(function (t) {
							for (let e = dr(t); null !== e; e = fr(e))
								for (let t = ht; t < e.length; t++) {
									const n = e[t],
										r = n[1];
									Dt(n) && Jr(r, n, r.template, n[8]);
								}
						})(e),
						null !== t.contentQueries && Qr(t, e),
						!i)
					)
						if (o) {
							const n = t.contentCheckHooks;
							null !== n && he(e, n);
						} else {
							const n = t.contentHooks;
							null !== n && de(e, n, 1), fe(e, 1);
						}
					!(function (t, e) {
						const n = t.hostBindingOpCodes;
						if (null !== n)
							try {
								for (let t = 0; t < n.length; t++) {
									const r = n[t];
									if (r < 0) le(~r);
									else {
										const s = r,
											i = n[++t],
											o = n[++t];
										Kt(i, s), o(2, e[s]);
									}
								}
							} finally {
								le(-1);
							}
					})(t, e);
					const a = t.components;
					null !== a &&
						(function (t, e) {
							for (let n = 0; n < e.length; n++) fs(t, e[n]);
						})(e, a);
					const l = t.viewQuery;
					if ((null !== l && vs(2, l, r), !i))
						if (o) {
							const n = t.viewCheckHooks;
							null !== n && he(e, n);
						} else {
							const n = t.viewHooks;
							null !== n && de(e, n, 2), fe(e, 2);
						}
					!0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
						i || (e[2] &= -73),
						1024 & e[2] && ((e[2] &= -1025), Mt(e[3], -1));
				} finally {
					ae();
				}
			}
			function Xr(t, e, n, r) {
				const s = e[10],
					i = !Wt(),
					o = Nt(e);
				try {
					i && !o && s.begin && s.begin(),
						o && Kr(t, e, r),
						Jr(t, e, n, r);
				} finally {
					i && !o && s.end && s.end();
				}
			}
			function Yr(t, e, n, r, s) {
				const i = Ut.lFrame.selectedIndex;
				try {
					le(-1),
						2 & r &&
							e.length > ut &&
							(function (t, e, n, r) {
								if (!r)
									if (3 == (3 & e[2])) {
										const n = t.preOrderCheckHooks;
										null !== n && he(e, n, 20);
									} else {
										const n = t.preOrderHooks;
										null !== n && de(e, n, 0, 20);
									}
								le(20);
							})(t, e, 0, Wt()),
						n(r, s);
				} finally {
					le(i);
				}
			}
			function ts(t) {
				const e = t.tView;
				return null === e || e.incompleteFirstPass
					? (t.tView = es(
							1,
							null,
							t.template,
							t.decls,
							t.vars,
							t.directiveDefs,
							t.pipeDefs,
							t.viewQuery,
							t.schemas,
							t.consts
					  ))
					: e;
			}
			function es(t, e, n, r, s, i, o, a, l, c) {
				const u = ut + r,
					h = u + s,
					d = (function (t, e) {
						const n = [];
						for (let r = 0; r < e; r++) n.push(r < t ? null : Br);
						return n;
					})(u, h),
					f = 'function' == typeof c ? c() : c;
				return (d[1] = {
					type: t,
					blueprint: d,
					template: n,
					queries: null,
					viewQuery: a,
					declTNode: e,
					data: d.slice().fill(null, u),
					bindingStartIndex: u,
					expandoStartIndex: h,
					hostBindingOpCodes: null,
					firstCreatePass: !0,
					firstUpdatePass: !0,
					staticViewQueries: !1,
					staticContentQueries: !1,
					preOrderHooks: null,
					preOrderCheckHooks: null,
					contentHooks: null,
					contentCheckHooks: null,
					viewHooks: null,
					viewCheckHooks: null,
					destroyHooks: null,
					cleanup: null,
					contentQueries: null,
					components: null,
					directiveRegistry: 'function' == typeof i ? i() : i,
					pipeRegistry: 'function' == typeof o ? o() : o,
					firstChild: null,
					schemas: l,
					consts: f,
					incompleteFirstPass: !1
				});
			}
			function ns(t, e, n, r) {
				const s = Ss(e);
				null === n
					? s.push(r)
					: (s.push(n),
					  t.firstCreatePass && Es(t).push(r, s.length - 1));
			}
			function rs(t, e, n) {
				for (let r in t)
					if (t.hasOwnProperty(r)) {
						const s = t[r];
						(n = null === n ? {} : n).hasOwnProperty(r)
							? n[r].push(e, s)
							: (n[r] = [e, s]);
					}
				return n;
			}
			function ss(t, e, n, r, s, i) {
				const o = i.hostBindings;
				if (o) {
					let n = t.hostBindingOpCodes;
					null === n && (n = t.hostBindingOpCodes = []);
					const i = ~e.index;
					(function (t) {
						let e = t.length;
						for (; e > 0; ) {
							const n = t[--e];
							if ('number' == typeof n && n < 0) return n;
						}
						return 0;
					})(n) != i && n.push(i),
						n.push(r, s, o);
				}
			}
			function is(t, e) {
				null !== t.hostBindings && t.hostBindings(1, e);
			}
			function os(t, e) {
				(e.flags |= 2),
					(t.components || (t.components = [])).push(e.index);
			}
			function as(t, e, n) {
				if (n) {
					if (e.exportAs)
						for (let r = 0; r < e.exportAs.length; r++)
							n[e.exportAs[r]] = t;
					yt(e) && (n[''] = t);
				}
			}
			function ls(t, e, n) {
				(t.flags |= 1),
					(t.directiveStart = e),
					(t.directiveEnd = e + n),
					(t.providerIndexes = e);
			}
			function cs(t, e, n, r, s) {
				t.data[r] = s;
				const i = s.factory || (s.factory = _t(s.type)),
					o = new ye(i, yt(s), null);
				(t.blueprint[r] = o),
					(n[r] = o),
					ss(t, e, 0, r, Gr(t, n, s.hostVars, Br), s);
			}
			function us(t, e, n) {
				const r = It(e, t),
					s = ts(n),
					i = t[10],
					o = gs(
						t,
						Wr(
							t,
							s,
							null,
							n.onPush ? 64 : 16,
							r,
							e,
							i,
							i.createRenderer(r, n),
							null,
							null
						)
					);
				t[e.index] = o;
			}
			function hs(t, e, n, r, s, i) {
				const o = i[e];
				if (null !== o) {
					const t = r.setInput;
					for (let e = 0; e < o.length; ) {
						const s = o[e++],
							i = o[e++],
							a = o[e++];
						null !== t ? r.setInput(n, a, s, i) : (n[i] = a);
					}
				}
			}
			function ds(t, e) {
				let n = null,
					r = 0;
				for (; r < e.length; ) {
					const s = e[r];
					if (0 !== s)
						if (5 !== s) {
							if ('number' == typeof s) break;
							t.hasOwnProperty(s) &&
								(null === n && (n = []),
								n.push(s, t[s], e[r + 1])),
								(r += 2);
						} else r += 2;
					else r += 4;
				}
				return n;
			}
			function fs(t, e) {
				const n = Rt(e, t);
				if (Dt(n)) {
					const t = n[1];
					80 & n[2] ? Jr(t, n, t.template, n[8]) : n[5] > 0 && ps(n);
				}
			}
			function ps(t) {
				for (let n = dr(t); null !== n; n = fr(n))
					for (let t = ht; t < n.length; t++) {
						const e = n[t];
						if (1024 & e[2]) {
							const t = e[1];
							Jr(t, e, t.template, e[8]);
						} else e[5] > 0 && ps(e);
					}
				const e = t[1].components;
				if (null !== e)
					for (let n = 0; n < e.length; n++) {
						const r = Rt(e[n], t);
						Dt(r) && r[5] > 0 && ps(r);
					}
			}
			function ms(t, e) {
				const n = Rt(e, t),
					r = n[1];
				!(function (t, e) {
					for (let n = e.length; n < t.blueprint.length; n++)
						e.push(t.blueprint[n]);
				})(r, n),
					Kr(r, n, n[8]);
			}
			function gs(t, e) {
				return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
			}
			function ys(t) {
				for (; t; ) {
					t[2] |= 64;
					const e = hr(t);
					if (0 != (512 & t[2]) && !e) return t;
					t = e;
				}
				return null;
			}
			function _s(t, e, n) {
				const r = e[10];
				r.begin && r.begin();
				try {
					Jr(t, e, t.template, n);
				} catch (s) {
					throw (Cs(e, s), s);
				} finally {
					r.end && r.end();
				}
			}
			function bs(t) {
				!(function (t) {
					for (let e = 0; e < t.components.length; e++) {
						const n = t.components[e],
							r = Pt(n),
							s = r[1];
						Xr(s, r, s.template, n);
					}
				})(t[8]);
			}
			function vs(t, e, n) {
				Yt(0), e(t, n);
			}
			const ws = (() => Promise.resolve(null))();
			function Ss(t) {
				return t[7] || (t[7] = []);
			}
			function Es(t) {
				return t.cleanup || (t.cleanup = []);
			}
			function Cs(t, e) {
				const n = t[9],
					r = n ? n.get(ir, null) : null;
				r && r.handleError(e);
			}
			function Ts(t, e, n, r, s) {
				for (let i = 0; i < n.length; ) {
					const o = n[i++],
						a = n[i++],
						l = e[o],
						c = t.data[o];
					null !== c.setInput ? c.setInput(l, s, r, a) : (l[a] = s);
				}
			}
			function xs(t, e, n) {
				let r = n ? t.styles : null,
					s = n ? t.classes : null,
					i = 0;
				if (null !== e)
					for (let o = 0; o < e.length; o++) {
						const t = e[o];
						'number' == typeof t
							? (i = t)
							: 1 == i
							? (s = p(s, t))
							: 2 == i && (r = p(r, t + ': ' + e[++o] + ';'));
					}
				n ? (t.styles = r) : (t.stylesWithoutHost = r),
					n ? (t.classes = s) : (t.classesWithoutHost = s);
			}
			const Os = new Ze('INJECTOR', -1);
			class ks {
				get(t, e = en) {
					if (e === en) {
						const e = new Error(
							`NullInjectorError: No provider for ${f(t)}!`
						);
						throw ((e.name = 'NullInjectorError'), e);
					}
					return e;
				}
			}
			const As = new Ze('Set Injector scope.'),
				Is = {},
				js = {},
				Rs = [];
			let Ps;
			function Ns() {
				return void 0 === Ps && (Ps = new ks()), Ps;
			}
			function Ds(t, e = null, n = null, r) {
				return new Fs(t, n, e || Ns(), r);
			}
			class Fs {
				constructor(t, e, n, r = null) {
					(this.parent = n),
						(this.records = new Map()),
						(this.injectorDefTypes = new Set()),
						(this.onDestroy = new Set()),
						(this._destroyed = !1);
					const s = [];
					e && Xe(e, (n) => this.processProvider(n, t, e)),
						Xe([t], (t) => this.processInjectorType(t, [], s)),
						this.records.set(Os, Ms(void 0, this));
					const i = this.records.get(As);
					(this.scope = null != i ? i.value : null),
						(this.source =
							r || ('object' == typeof t ? null : f(t)));
				}
				get destroyed() {
					return this._destroyed;
				}
				destroy() {
					this.assertNotDestroyed(), (this._destroyed = !0);
					try {
						this.onDestroy.forEach((t) => t.ngOnDestroy());
					} finally {
						this.records.clear(),
							this.onDestroy.clear(),
							this.injectorDefTypes.clear();
					}
				}
				get(t, e = en, n = j.Default) {
					this.assertNotDestroyed();
					const r = an(this);
					try {
						if (!(n & j.SkipSelf)) {
							let e = this.records.get(t);
							if (void 0 === e) {
								const n =
									('function' == typeof (s = t) ||
										('object' == typeof s &&
											s instanceof Ze)) &&
									C(t);
								(e =
									n && this.injectableDefInScope(n)
										? Ms(Ls(t), Is)
										: null),
									this.records.set(t, e);
							}
							if (null != e) return this.hydrate(t, e);
						}
						return (n & j.Self ? Ns() : this.parent).get(
							t,
							(e = n & j.Optional && e === en ? null : e)
						);
					} catch (i) {
						if ('NullInjectorError' === i.name) {
							if (
								((i.ngTempTokenPath =
									i.ngTempTokenPath || []).unshift(f(t)),
								r)
							)
								throw i;
							return (function (t, e, n, r) {
								const s = t.ngTempTokenPath;
								throw (
									(e[rn] && s.unshift(e[rn]),
									(t.message = (function (t, e, n, r = null) {
										t =
											t &&
											'\n' === t.charAt(0) &&
											'\u0275' == t.charAt(1)
												? t.substr(2)
												: t;
										let s = f(e);
										if (Array.isArray(e))
											s = e.map(f).join(' -> ');
										else if ('object' == typeof e) {
											let t = [];
											for (let n in e)
												if (e.hasOwnProperty(n)) {
													let r = e[n];
													t.push(
														n +
															':' +
															('string' ==
															typeof r
																? JSON.stringify(
																		r
																  )
																: f(r))
													);
												}
											s = `{${t.join(', ')}}`;
										}
										return `${n}${
											r ? '(' + r + ')' : ''
										}[${s}]: ${t.replace(nn, '\n  ')}`;
									})('\n' + t.message, s, n, r)),
									(t.ngTokenPath = s),
									(t.ngTempTokenPath = null),
									t)
								);
							})(i, t, 'R3InjectorError', this.source);
						}
						throw i;
					} finally {
						an(r);
					}
					var s;
				}
				_resolveInjectorDefTypes() {
					this.injectorDefTypes.forEach((t) => this.get(t));
				}
				toString() {
					const t = [];
					return (
						this.records.forEach((e, n) => t.push(f(n))),
						`R3Injector[${t.join(', ')}]`
					);
				}
				assertNotDestroyed() {
					if (this._destroyed)
						throw new Error('Injector has already been destroyed.');
				}
				processInjectorType(t, e, n) {
					if (!(t = y(t))) return !1;
					let r = x(t);
					const s = (null == r && t.ngModule) || void 0,
						i = void 0 === s ? t : s,
						o = -1 !== n.indexOf(i);
					if ((void 0 !== s && (r = x(s)), null == r)) return !1;
					if (null != r.imports && !o) {
						let t;
						n.push(i);
						try {
							Xe(r.imports, (r) => {
								this.processInjectorType(r, e, n) &&
									(void 0 === t && (t = []), t.push(r));
							});
						} finally {
						}
						if (void 0 !== t)
							for (let e = 0; e < t.length; e++) {
								const { ngModule: n, providers: r } = t[e];
								Xe(r, (t) =>
									this.processProvider(t, n, r || Rs)
								);
							}
					}
					this.injectorDefTypes.add(i);
					const a = _t(i) || (() => new i());
					this.records.set(i, Ms(a, Is));
					const l = r.providers;
					if (null != l && !o) {
						const e = t;
						Xe(l, (t) => this.processProvider(t, e, l));
					}
					return void 0 !== s && void 0 !== t.providers;
				}
				processProvider(t, e, n) {
					let r = Hs((t = y(t))) ? t : y(t && t.provide);
					const s = (function (t, e, n) {
						return Us(t)
							? Ms(void 0, t.useValue)
							: Ms(
									(function (t, e, n) {
										let r;
										if (Hs(t)) {
											const e = y(t);
											return _t(e) || Ls(e);
										}
										if (Us(t)) r = () => y(t.useValue);
										else if ((s = t) && s.useFactory)
											r = () =>
												t.useFactory(
													...un(t.deps || [])
												);
										else if (
											(function (t) {
												return !(!t || !t.useExisting);
											})(t)
										)
											r = () => cn(y(t.useExisting));
										else {
											const e = y(
												t && (t.useClass || t.provide)
											);
											if (
												!(function (t) {
													return !!t.deps;
												})(t)
											)
												return _t(e) || Ls(e);
											r = () => new e(...un(t.deps));
										}
										var s;
										return r;
									})(t),
									Is
							  );
					})(t);
					if (Hs(t) || !0 !== t.multi) this.records.get(r);
					else {
						let e = this.records.get(r);
						e ||
							((e = Ms(void 0, Is, !0)),
							(e.factory = () => un(e.multi)),
							this.records.set(r, e)),
							(r = t),
							e.multi.push(t);
					}
					this.records.set(r, s);
				}
				hydrate(t, e) {
					var n;
					return (
						e.value === Is &&
							((e.value = js), (e.value = e.factory())),
						'object' == typeof e.value &&
							e.value &&
							null !== (n = e.value) &&
							'object' == typeof n &&
							'function' == typeof n.ngOnDestroy &&
							this.onDestroy.add(e.value),
						e.value
					);
				}
				injectableDefInScope(t) {
					return (
						!!t.providedIn &&
						('string' == typeof t.providedIn
							? 'any' === t.providedIn ||
							  t.providedIn === this.scope
							: this.injectorDefTypes.has(t.providedIn))
					);
				}
			}
			function Ls(t) {
				const e = C(t),
					n = null !== e ? e.factory : _t(t);
				if (null !== n) return n;
				if (t instanceof Ze)
					throw new Error(
						`Token ${f(t)} is missing a \u0275prov definition.`
					);
				if (t instanceof Function)
					return (function (t) {
						const e = t.length;
						if (e > 0) {
							const n = (function (t, e) {
								const n = [];
								for (let r = 0; r < t; r++) n.push('?');
								return n;
							})(e);
							throw new Error(
								`Can't resolve all parameters for ${f(
									t
								)}: (${n.join(', ')}).`
							);
						}
						const n = (function (t) {
							const e = t && (t[O] || t[A]);
							if (e) {
								const n = (function (t) {
									if (t.hasOwnProperty('name')) return t.name;
									const e = ('' + t).match(
										/^function\s*([^\s(]+)/
									);
									return null === e ? '' : e[1];
								})(t);
								return (
									console.warn(
										`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
									),
									e
								);
							}
							return null;
						})(t);
						return null !== n ? () => n.factory(t) : () => new t();
					})(t);
				throw new Error('unreachable');
			}
			function Ms(t, e, n = !1) {
				return { factory: t, value: e, multi: n ? [] : void 0 };
			}
			function Us(t) {
				return null !== t && 'object' == typeof t && sn in t;
			}
			function Hs(t) {
				return 'function' == typeof t;
			}
			const $s = function (t, e, n) {
				return (function (t, e = null, n = null, r) {
					const s = Ds(t, e, n, r);
					return s._resolveInjectorDefTypes(), s;
				})({ name: n }, e, t, n);
			};
			let zs = (() => {
				class t {
					static create(t, e) {
						return Array.isArray(t)
							? $s(t, e, '')
							: $s(t.providers, t.parent, t.name || '');
					}
				}
				return (
					(t.THROW_IF_NOT_FOUND = en),
					(t.NULL = new ks()),
					(t.ɵprov = S({
						token: t,
						providedIn: 'any',
						factory: () => cn(Os)
					})),
					(t.__NG_ELEMENT_ID__ = -1),
					t
				);
			})();
			function qs(t, e) {
				ue(Pt(t)[1], qt());
			}
			let Vs = null;
			function Bs() {
				if (!Vs) {
					const t = z.Symbol;
					if (t && t.iterator) Vs = t.iterator;
					else {
						const t = Object.getOwnPropertyNames(Map.prototype);
						for (let e = 0; e < t.length; ++e) {
							const n = t[e];
							'entries' !== n &&
								'size' !== n &&
								Map.prototype[n] === Map.prototype.entries &&
								(Vs = n);
						}
					}
				}
				return Vs;
			}
			function Qs(t) {
				return (
					!!Ws(t) &&
					(Array.isArray(t) || (!(t instanceof Map) && Bs() in t))
				);
			}
			function Ws(t) {
				return (
					null !== t &&
					('function' == typeof t || 'object' == typeof t)
				);
			}
			function Zs(t, e, n) {
				return !Object.is(t[e], n) && ((t[e] = n), !0);
			}
			function Gs(t, e, n, r) {
				const s = $t();
				return (
					Zs(s, Gt(), e) &&
						(zt(),
						(function (t, e, n, r, s, i) {
							const o = It(t, e);
							!(function (t, e, n, r, s, i, o) {
								if (null == i)
									Ot(t)
										? t.removeAttribute(e, s, n)
										: e.removeAttribute(s);
								else {
									const a =
										null == o ? b(i) : o(i, r || '', s);
									Ot(t)
										? t.setAttribute(e, s, a, n)
										: n
										? e.setAttributeNS(n, s, a)
										: e.setAttribute(s, a);
								}
							})(e[11], o, i, t.value, n, r, s);
						})(ce(), s, t, e, n, r)),
					Gs
				);
			}
			function Ks(t, e = j.Default) {
				const n = $t();
				return null === n ? cn(t, e) : Fe(qt(), n, y(t), e);
			}
			function Js(t, e, n, r, s) {
				const i = s ? 'class' : 'style';
				Ts(t, n, e.inputs[i], i, r);
			}
			function Xs(t, e, n, r) {
				const s = $t(),
					i = zt(),
					o = ut + t,
					a = s[11],
					l = (s[o] = gr(a, e, Ut.lFrame.currentNamespace)),
					c = i.firstCreatePass
						? (function (t, e, n, r, s, i, o) {
								const a = e.consts,
									l = Zr(e, t, 2, s, Ft(a, i));
								return (
									(function (t, e, n, r) {
										let s = !1;
										if (Ht()) {
											const i = (function (t, e, n) {
													const r =
														t.directiveRegistry;
													let s = null;
													if (r)
														for (
															let i = 0;
															i < r.length;
															i++
														) {
															const o = r[i];
															zr(
																n,
																o.selectors,
																!1
															) &&
																(s || (s = []),
																Pe(
																	Ae(n, e),
																	t,
																	o.type
																),
																yt(o)
																	? (os(t, n),
																	  s.unshift(
																			o
																	  ))
																	: s.push(
																			o
																	  ));
														}
													return s;
												})(t, e, n),
												o =
													null === r
														? null
														: { '': -1 };
											if (null !== i) {
												(s = !0),
													ls(
														n,
														t.data.length,
														i.length
													);
												for (
													let t = 0;
													t < i.length;
													t++
												) {
													const e = i[t];
													e.providersResolver &&
														e.providersResolver(e);
												}
												let r = !1,
													a = !1,
													l = Gr(
														t,
														e,
														i.length,
														null
													);
												for (
													let s = 0;
													s < i.length;
													s++
												) {
													const c = i[s];
													(n.mergedAttrs = we(
														n.mergedAttrs,
														c.hostAttrs
													)),
														cs(t, n, e, l, c),
														as(l, c, o),
														null !==
															c.contentQueries &&
															(n.flags |= 8),
														(null ===
															c.hostBindings &&
															null ===
																c.hostAttrs &&
															0 === c.hostVars) ||
															(n.flags |= 128);
													const u = c.type.prototype;
													!r &&
														(u.ngOnChanges ||
															u.ngOnInit ||
															u.ngDoCheck) &&
														((
															t.preOrderHooks ||
															(t.preOrderHooks = [])
														).push(n.index),
														(r = !0)),
														a ||
															(!u.ngOnChanges &&
																!u.ngDoCheck) ||
															((
																t.preOrderCheckHooks ||
																(t.preOrderCheckHooks = [])
															).push(n.index),
															(a = !0)),
														l++;
												}
												!(function (t, e) {
													const n = e.directiveEnd,
														r = t.data,
														s = e.attrs,
														i = [];
													let o = null,
														a = null;
													for (
														let l =
															e.directiveStart;
														l < n;
														l++
													) {
														const t = r[l],
															n = t.inputs,
															c =
																null === s ||
																Lr(e)
																	? null
																	: ds(n, s);
														i.push(c),
															(o = rs(n, l, o)),
															(a = rs(
																t.outputs,
																l,
																a
															));
													}
													null !== o &&
														(o.hasOwnProperty(
															'class'
														) && (e.flags |= 16),
														o.hasOwnProperty(
															'style'
														) && (e.flags |= 32)),
														(e.initialInputs = i),
														(e.inputs = o),
														(e.outputs = a);
												})(t, n);
											}
											o &&
												(function (t, e, n) {
													if (e) {
														const r = (t.localNames = []);
														for (
															let t = 0;
															t < e.length;
															t += 2
														) {
															const s =
																n[e[t + 1]];
															if (null == s)
																throw new _(
																	'301',
																	`Export of name '${
																		e[t + 1]
																	}' not found!`
																);
															r.push(e[t], s);
														}
													}
												})(n, r, o);
										}
										n.mergedAttrs = we(
											n.mergedAttrs,
											n.attrs
										);
									})(e, n, l, Ft(a, o)),
									null !== l.attrs && xs(l, l.attrs, !1),
									null !== l.mergedAttrs &&
										xs(l, l.mergedAttrs, !0),
									null !== e.queries &&
										e.queries.elementStart(e, l),
									l
								);
						  })(o, i, s, 0, e, n, r)
						: i.data[o];
				Bt(c, !0);
				const u = c.mergedAttrs;
				null !== u && _e(a, l, u);
				const h = c.classes;
				null !== h && Pr(a, l, h);
				const d = c.styles;
				null !== d && Rr(a, l, d),
					64 != (64 & c.flags) && Tr(i, s, l, c),
					0 === Ut.lFrame.elementDepthCount && or(l, s),
					Ut.lFrame.elementDepthCount++,
					gt(c) &&
						((function (t, e, n) {
							Ht() &&
								((function (t, e, n, r) {
									const s = n.directiveStart,
										i = n.directiveEnd;
									t.firstCreatePass || Ae(n, e), or(r, e);
									const o = n.initialInputs;
									for (let a = s; a < i; a++) {
										const r = t.data[a],
											i = yt(r);
										i && us(e, n, r);
										const l = $e(e, t, a, n);
										or(l, e),
											null !== o &&
												hs(0, a - s, l, r, 0, o),
											i && (Rt(n.index, e)[8] = l);
									}
								})(t, e, n, It(n, e)),
								128 == (128 & n.flags) &&
									(function (t, e, n) {
										const r = n.directiveStart,
											s = n.directiveEnd,
											i = n.index,
											o = Ut.lFrame.currentDirectiveIndex;
										try {
											le(i);
											for (let n = r; n < s; n++) {
												const r = t.data[n],
													s = e[n];
												Jt(n),
													(null === r.hostBindings &&
														0 === r.hostVars &&
														null === r.hostAttrs) ||
														is(r, s);
											}
										} finally {
											le(-1), Jt(o);
										}
									})(t, e, n));
						})(i, s, c),
						(function (t, e, n) {
							if (pt(e)) {
								const r = e.directiveEnd;
								for (let s = e.directiveStart; s < r; s++) {
									const e = t.data[s];
									e.contentQueries &&
										e.contentQueries(1, n[s], s);
								}
							}
						})(i, c, s)),
					null !== r &&
						(function (t, e, n = It) {
							const r = e.localNames;
							if (null !== r) {
								let s = e.index + 1;
								for (let i = 0; i < r.length; i += 2) {
									const o = r[i + 1],
										a = -1 === o ? n(e, t) : t[o];
									t[s++] = a;
								}
							}
						})(s, c);
			}
			function Ys() {
				let t = qt();
				Qt() ? (Ut.lFrame.isParent = !1) : ((t = t.parent), Bt(t, !1));
				const e = t;
				Ut.lFrame.elementDepthCount--;
				const n = zt();
				n.firstCreatePass &&
					(ue(n, t), pt(t) && n.queries.elementEnd(t)),
					null != e.classesWithoutHost &&
						(function (t) {
							return 0 != (16 & t.flags);
						})(e) &&
						Js(n, e, $t(), e.classesWithoutHost, !0),
					null != e.stylesWithoutHost &&
						(function (t) {
							return 0 != (32 & t.flags);
						})(e) &&
						Js(n, e, $t(), e.stylesWithoutHost, !1);
			}
			function ti(t, e, n, r) {
				Xs(t, e, n, r), Ys();
			}
			function ei(t) {
				return !!t && 'function' == typeof t.then;
			}
			function ni(t) {
				return !!t && 'function' == typeof t.subscribe;
			}
			const ri = ni;
			function si(t, e, n = !1, r) {
				const s = $t(),
					i = zt(),
					o = qt();
				return (
					(function (t, e, n, r, s, i, o = !1, a) {
						const l = gt(r),
							c = t.firstCreatePass && Es(t),
							u = Ss(e);
						let h = !0;
						if (3 & r.type) {
							const d = It(r, e),
								f = a ? a(d) : q,
								p = f.target || d,
								m = u.length,
								g = a
									? (t) => a(At(t[r.index])).target
									: r.index;
							if (Ot(n)) {
								let o = null;
								if (
									(!a &&
										l &&
										(o = (function (t, e, n, r) {
											const s = t.cleanup;
											if (null != s)
												for (
													let i = 0;
													i < s.length - 1;
													i += 2
												) {
													const t = s[i];
													if (
														t === n &&
														s[i + 1] === r
													) {
														const t = e[7],
															n = s[i + 2];
														return t.length > n
															? t[n]
															: null;
													}
													'string' == typeof t &&
														(i += 2);
												}
											return null;
										})(t, e, s, r.index)),
									null !== o)
								)
									((
										o.__ngLastListenerFn__ || o
									).__ngNextListenerFn__ = i),
										(o.__ngLastListenerFn__ = i),
										(h = !1);
								else {
									i = oi(r, e, i, !1);
									const t = n.listen(f.name || p, s, i);
									u.push(i, t), c && c.push(s, g, m, m + 1);
								}
							} else
								(i = oi(r, e, i, !0)),
									p.addEventListener(s, i, o),
									u.push(i),
									c && c.push(s, g, m, o);
						} else i = oi(r, e, i, !1);
						const d = r.outputs;
						let f;
						if (h && null !== d && (f = d[s])) {
							const t = f.length;
							if (t)
								for (let n = 0; n < t; n += 2) {
									const t = e[f[n]][f[n + 1]].subscribe(i),
										o = u.length;
									u.push(i, t),
										c && c.push(s, r.index, o, -(o + 1));
								}
						}
					})(i, s, s[11], o, t, e, n, r),
					si
				);
			}
			function ii(t, e, n) {
				try {
					return !1 !== e(n);
				} catch (r) {
					return Cs(t, r), !1;
				}
			}
			function oi(t, e, n, r) {
				return function s(i) {
					if (i === Function) return n;
					const o = 2 & t.flags ? Rt(t.index, e) : e;
					0 == (32 & e[2]) && ys(o);
					let a = ii(e, n, i),
						l = s.__ngNextListenerFn__;
					for (; l; )
						(a = ii(e, l, i) && a), (l = l.__ngNextListenerFn__);
					return (
						r &&
							!1 === a &&
							(i.preventDefault(), (i.returnValue = !1)),
						a
					);
				};
			}
			function ai(t, e = '') {
				const n = $t(),
					r = zt(),
					s = t + ut,
					i = r.firstCreatePass ? Zr(r, s, 1, e, null) : r.data[s],
					o = (n[s] = (function (t, e) {
						return Ot(t) ? t.createText(e) : t.createTextNode(e);
					})(n[11], e));
				Tr(r, n, o, i), Bt(i, !1);
			}
			function li(t, e, n) {
				const r = $t();
				return (
					Zs(r, Gt(), e) &&
						(function (t, e, n, r, s, i, o, a) {
							const l = It(e, n);
							var c;
							3 & e.type &&
								((r =
									'class' === (c = r)
										? 'className'
										: 'for' === c
										? 'htmlFor'
										: 'formaction' === c
										? 'formAction'
										: 'innerHtml' === c
										? 'innerHTML'
										: 'readonly' === c
										? 'readOnly'
										: 'tabindex' === c
										? 'tabIndex'
										: c),
								(s = null != o ? o(s, e.value || '', r) : s),
								Ot(i)
									? i.setProperty(l, r, s)
									: ve(r) ||
									  (l.setProperty
											? l.setProperty(r, s)
											: (l[r] = s)));
						})(zt(), ce(), r, t, e, r[11], n),
					li
				);
			}
			const ci = void 0;
			var ui = [
				'en',
				[['a', 'p'], ['AM', 'PM'], ci],
				[['AM', 'PM'], ci, ci],
				[
					['S', 'M', 'T', 'W', 'T', 'F', 'S'],
					['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
					[
						'Sunday',
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
						'Saturday'
					],
					['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
				],
				ci,
				[
					[
						'J',
						'F',
						'M',
						'A',
						'M',
						'J',
						'J',
						'A',
						'S',
						'O',
						'N',
						'D'
					],
					[
						'Jan',
						'Feb',
						'Mar',
						'Apr',
						'May',
						'Jun',
						'Jul',
						'Aug',
						'Sep',
						'Oct',
						'Nov',
						'Dec'
					],
					[
						'January',
						'February',
						'March',
						'April',
						'May',
						'June',
						'July',
						'August',
						'September',
						'October',
						'November',
						'December'
					]
				],
				ci,
				[
					['B', 'A'],
					['BC', 'AD'],
					['Before Christ', 'Anno Domini']
				],
				0,
				[6, 0],
				['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
				['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
				['{1}, {0}', ci, "{1} 'at' {0}", ci],
				[
					'.',
					',',
					';',
					'%',
					'+',
					'-',
					'E',
					'\xd7',
					'\u2030',
					'\u221e',
					'NaN',
					':'
				],
				['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
				'USD',
				'$',
				'US Dollar',
				{},
				'ltr',
				function (t) {
					let e = Math.floor(Math.abs(t)),
						n = t.toString().replace(/^[^.]*\.?/, '').length;
					return 1 === e && 0 === n ? 1 : 5;
				}
			];
			let hi = {};
			function di(t, e, n) {
				'string' != typeof e && ((n = e), (e = t[yi.LocaleId])),
					(e = e.toLowerCase().replace(/_/g, '-')),
					(hi[e] = t),
					n && (hi[e][yi.ExtraData] = n);
			}
			function fi(t) {
				const e = (function (t) {
					return t.toLowerCase().replace(/_/g, '-');
				})(t);
				let n = gi(e);
				if (n) return n;
				const r = e.split('-')[0];
				if (((n = gi(r)), n)) return n;
				if ('en' === r) return ui;
				throw new Error(`Missing locale data for the locale "${t}".`);
			}
			function pi(t) {
				return fi(t)[yi.CurrencyCode] || null;
			}
			function mi(t) {
				return fi(t)[yi.PluralCase];
			}
			function gi(t) {
				return (
					t in hi ||
						(hi[t] =
							z.ng &&
							z.ng.common &&
							z.ng.common.locales &&
							z.ng.common.locales[t]),
					hi[t]
				);
			}
			var yi = (function (t) {
				return (
					(t[(t.LocaleId = 0)] = 'LocaleId'),
					(t[(t.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
					(t[(t.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
					(t[(t.DaysFormat = 3)] = 'DaysFormat'),
					(t[(t.DaysStandalone = 4)] = 'DaysStandalone'),
					(t[(t.MonthsFormat = 5)] = 'MonthsFormat'),
					(t[(t.MonthsStandalone = 6)] = 'MonthsStandalone'),
					(t[(t.Eras = 7)] = 'Eras'),
					(t[(t.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
					(t[(t.WeekendRange = 9)] = 'WeekendRange'),
					(t[(t.DateFormat = 10)] = 'DateFormat'),
					(t[(t.TimeFormat = 11)] = 'TimeFormat'),
					(t[(t.DateTimeFormat = 12)] = 'DateTimeFormat'),
					(t[(t.NumberSymbols = 13)] = 'NumberSymbols'),
					(t[(t.NumberFormats = 14)] = 'NumberFormats'),
					(t[(t.CurrencyCode = 15)] = 'CurrencyCode'),
					(t[(t.CurrencySymbol = 16)] = 'CurrencySymbol'),
					(t[(t.CurrencyName = 17)] = 'CurrencyName'),
					(t[(t.Currencies = 18)] = 'Currencies'),
					(t[(t.Directionality = 19)] = 'Directionality'),
					(t[(t.PluralCase = 20)] = 'PluralCase'),
					(t[(t.ExtraData = 21)] = 'ExtraData'),
					t
				);
			})({});
			const _i = 'en-US';
			let bi = _i;
			function vi(t) {
				var e, n;
				(n = 'Expected localeId to be defined'),
					null == (e = t) &&
						(function (t, e, n, r) {
							throw new Error(
								`ASSERTION ERROR: ${t} [Expected=> null != ${e} <=Actual]`
							);
						})(n, e),
					'string' == typeof t &&
						(bi = t.toLowerCase().replace(/_/g, '-'));
			}
			class wi {}
			class Si {
				resolveComponentFactory(t) {
					throw (function (t) {
						const e = Error(
							`No component factory found for ${f(
								t
							)}. Did you add it to @NgModule.entryComponents?`
						);
						return (e.ngComponent = t), e;
					})(t);
				}
			}
			let Ei = (() => {
				class t {}
				return (t.NULL = new Si()), t;
			})();
			function Ci(...t) {}
			function Ti(t, e) {
				return new Oi(It(t, e));
			}
			const xi = function () {
				return Ti(qt(), $t());
			};
			let Oi = (() => {
				class t {
					constructor(t) {
						this.nativeElement = t;
					}
				}
				return (t.__NG_ELEMENT_ID__ = xi), t;
			})();
			function ki(t) {
				return t instanceof Oi ? t.nativeElement : t;
			}
			class Ai {}
			let Ii = (() => {
				class t {}
				return (t.__NG_ELEMENT_ID__ = () => ji()), t;
			})();
			const ji = function () {
				const t = $t(),
					e = Rt(qt().index, t);
				return (function (t) {
					return t[11];
				})(dt(e) ? e : t);
			};
			let Ri = (() => {
				class t {}
				return (
					(t.ɵprov = S({
						token: t,
						providedIn: 'root',
						factory: () => null
					})),
					t
				);
			})();
			class Pi {
				constructor(t) {
					(this.full = t),
						(this.major = t.split('.')[0]),
						(this.minor = t.split('.')[1]),
						(this.patch = t.split('.').slice(2).join('.'));
				}
			}
			const Ni = new Pi('11.2.8');
			class Di {
				constructor() {}
				supports(t) {
					return Qs(t);
				}
				create(t) {
					return new Li(t);
				}
			}
			const Fi = (t, e) => e;
			class Li {
				constructor(t) {
					(this.length = 0),
						(this._linkedRecords = null),
						(this._unlinkedRecords = null),
						(this._previousItHead = null),
						(this._itHead = null),
						(this._itTail = null),
						(this._additionsHead = null),
						(this._additionsTail = null),
						(this._movesHead = null),
						(this._movesTail = null),
						(this._removalsHead = null),
						(this._removalsTail = null),
						(this._identityChangesHead = null),
						(this._identityChangesTail = null),
						(this._trackByFn = t || Fi);
				}
				forEachItem(t) {
					let e;
					for (e = this._itHead; null !== e; e = e._next) t(e);
				}
				forEachOperation(t) {
					let e = this._itHead,
						n = this._removalsHead,
						r = 0,
						s = null;
					for (; e || n; ) {
						const i =
								!n || (e && e.currentIndex < $i(n, r, s))
									? e
									: n,
							o = $i(i, r, s),
							a = i.currentIndex;
						if (i === n) r--, (n = n._nextRemoved);
						else if (((e = e._next), null == i.previousIndex)) r++;
						else {
							s || (s = []);
							const t = o - r,
								e = a - r;
							if (t != e) {
								for (let n = 0; n < t; n++) {
									const r = n < s.length ? s[n] : (s[n] = 0),
										i = r + n;
									e <= i && i < t && (s[n] = r + 1);
								}
								s[i.previousIndex] = e - t;
							}
						}
						o !== a && t(i, o, a);
					}
				}
				forEachPreviousItem(t) {
					let e;
					for (
						e = this._previousItHead;
						null !== e;
						e = e._nextPrevious
					)
						t(e);
				}
				forEachAddedItem(t) {
					let e;
					for (e = this._additionsHead; null !== e; e = e._nextAdded)
						t(e);
				}
				forEachMovedItem(t) {
					let e;
					for (e = this._movesHead; null !== e; e = e._nextMoved)
						t(e);
				}
				forEachRemovedItem(t) {
					let e;
					for (e = this._removalsHead; null !== e; e = e._nextRemoved)
						t(e);
				}
				forEachIdentityChange(t) {
					let e;
					for (
						e = this._identityChangesHead;
						null !== e;
						e = e._nextIdentityChange
					)
						t(e);
				}
				diff(t) {
					if ((null == t && (t = []), !Qs(t)))
						throw new Error(
							`Error trying to diff '${f(
								t
							)}'. Only arrays and iterables are allowed`
						);
					return this.check(t) ? this : null;
				}
				onDestroy() {}
				check(t) {
					this._reset();
					let e,
						n,
						r,
						s = this._itHead,
						i = !1;
					if (Array.isArray(t)) {
						this.length = t.length;
						for (let e = 0; e < this.length; e++)
							(n = t[e]),
								(r = this._trackByFn(e, n)),
								null !== s && Object.is(s.trackById, r)
									? (i &&
											(s = this._verifyReinsertion(
												s,
												n,
												r,
												e
											)),
									  Object.is(s.item, n) ||
											this._addIdentityChange(s, n))
									: ((s = this._mismatch(s, n, r, e)),
									  (i = !0)),
								(s = s._next);
					} else
						(e = 0),
							(function (t, e) {
								if (Array.isArray(t))
									for (let n = 0; n < t.length; n++) e(t[n]);
								else {
									const n = t[Bs()]();
									let r;
									for (; !(r = n.next()).done; ) e(r.value);
								}
							})(t, (t) => {
								(r = this._trackByFn(e, t)),
									null !== s && Object.is(s.trackById, r)
										? (i &&
												(s = this._verifyReinsertion(
													s,
													t,
													r,
													e
												)),
										  Object.is(s.item, t) ||
												this._addIdentityChange(s, t))
										: ((s = this._mismatch(s, t, r, e)),
										  (i = !0)),
									(s = s._next),
									e++;
							}),
							(this.length = e);
					return (
						this._truncate(s), (this.collection = t), this.isDirty
					);
				}
				get isDirty() {
					return (
						null !== this._additionsHead ||
						null !== this._movesHead ||
						null !== this._removalsHead ||
						null !== this._identityChangesHead
					);
				}
				_reset() {
					if (this.isDirty) {
						let t;
						for (
							t = this._previousItHead = this._itHead;
							null !== t;
							t = t._next
						)
							t._nextPrevious = t._next;
						for (
							t = this._additionsHead;
							null !== t;
							t = t._nextAdded
						)
							t.previousIndex = t.currentIndex;
						for (
							this._additionsHead = this._additionsTail = null,
								t = this._movesHead;
							null !== t;
							t = t._nextMoved
						)
							t.previousIndex = t.currentIndex;
						(this._movesHead = this._movesTail = null),
							(this._removalsHead = this._removalsTail = null),
							(this._identityChangesHead = this._identityChangesTail = null);
					}
				}
				_mismatch(t, e, n, r) {
					let s;
					return (
						null === t
							? (s = this._itTail)
							: ((s = t._prev), this._remove(t)),
						null !==
						(t =
							null === this._unlinkedRecords
								? null
								: this._unlinkedRecords.get(n, null))
							? (Object.is(t.item, e) ||
									this._addIdentityChange(t, e),
							  this._reinsertAfter(t, s, r))
							: null !==
							  (t =
									null === this._linkedRecords
										? null
										: this._linkedRecords.get(n, r))
							? (Object.is(t.item, e) ||
									this._addIdentityChange(t, e),
							  this._moveAfter(t, s, r))
							: (t = this._addAfter(new Mi(e, n), s, r)),
						t
					);
				}
				_verifyReinsertion(t, e, n, r) {
					let s =
						null === this._unlinkedRecords
							? null
							: this._unlinkedRecords.get(n, null);
					return (
						null !== s
							? (t = this._reinsertAfter(s, t._prev, r))
							: t.currentIndex != r &&
							  ((t.currentIndex = r), this._addToMoves(t, r)),
						t
					);
				}
				_truncate(t) {
					for (; null !== t; ) {
						const e = t._next;
						this._addToRemovals(this._unlink(t)), (t = e);
					}
					null !== this._unlinkedRecords &&
						this._unlinkedRecords.clear(),
						null !== this._additionsTail &&
							(this._additionsTail._nextAdded = null),
						null !== this._movesTail &&
							(this._movesTail._nextMoved = null),
						null !== this._itTail && (this._itTail._next = null),
						null !== this._removalsTail &&
							(this._removalsTail._nextRemoved = null),
						null !== this._identityChangesTail &&
							(this._identityChangesTail._nextIdentityChange = null);
				}
				_reinsertAfter(t, e, n) {
					null !== this._unlinkedRecords &&
						this._unlinkedRecords.remove(t);
					const r = t._prevRemoved,
						s = t._nextRemoved;
					return (
						null === r
							? (this._removalsHead = s)
							: (r._nextRemoved = s),
						null === s
							? (this._removalsTail = r)
							: (s._prevRemoved = r),
						this._insertAfter(t, e, n),
						this._addToMoves(t, n),
						t
					);
				}
				_moveAfter(t, e, n) {
					return (
						this._unlink(t),
						this._insertAfter(t, e, n),
						this._addToMoves(t, n),
						t
					);
				}
				_addAfter(t, e, n) {
					return (
						this._insertAfter(t, e, n),
						(this._additionsTail =
							null === this._additionsTail
								? (this._additionsHead = t)
								: (this._additionsTail._nextAdded = t)),
						t
					);
				}
				_insertAfter(t, e, n) {
					const r = null === e ? this._itHead : e._next;
					return (
						(t._next = r),
						(t._prev = e),
						null === r ? (this._itTail = t) : (r._prev = t),
						null === e ? (this._itHead = t) : (e._next = t),
						null === this._linkedRecords &&
							(this._linkedRecords = new Hi()),
						this._linkedRecords.put(t),
						(t.currentIndex = n),
						t
					);
				}
				_remove(t) {
					return this._addToRemovals(this._unlink(t));
				}
				_unlink(t) {
					null !== this._linkedRecords &&
						this._linkedRecords.remove(t);
					const e = t._prev,
						n = t._next;
					return (
						null === e ? (this._itHead = n) : (e._next = n),
						null === n ? (this._itTail = e) : (n._prev = e),
						t
					);
				}
				_addToMoves(t, e) {
					return (
						t.previousIndex === e ||
							(this._movesTail =
								null === this._movesTail
									? (this._movesHead = t)
									: (this._movesTail._nextMoved = t)),
						t
					);
				}
				_addToRemovals(t) {
					return (
						null === this._unlinkedRecords &&
							(this._unlinkedRecords = new Hi()),
						this._unlinkedRecords.put(t),
						(t.currentIndex = null),
						(t._nextRemoved = null),
						null === this._removalsTail
							? ((this._removalsTail = this._removalsHead = t),
							  (t._prevRemoved = null))
							: ((t._prevRemoved = this._removalsTail),
							  (this._removalsTail = this._removalsTail._nextRemoved = t)),
						t
					);
				}
				_addIdentityChange(t, e) {
					return (
						(t.item = e),
						(this._identityChangesTail =
							null === this._identityChangesTail
								? (this._identityChangesHead = t)
								: (this._identityChangesTail._nextIdentityChange = t)),
						t
					);
				}
			}
			class Mi {
				constructor(t, e) {
					(this.item = t),
						(this.trackById = e),
						(this.currentIndex = null),
						(this.previousIndex = null),
						(this._nextPrevious = null),
						(this._prev = null),
						(this._next = null),
						(this._prevDup = null),
						(this._nextDup = null),
						(this._prevRemoved = null),
						(this._nextRemoved = null),
						(this._nextAdded = null),
						(this._nextMoved = null),
						(this._nextIdentityChange = null);
				}
			}
			class Ui {
				constructor() {
					(this._head = null), (this._tail = null);
				}
				add(t) {
					null === this._head
						? ((this._head = this._tail = t),
						  (t._nextDup = null),
						  (t._prevDup = null))
						: ((this._tail._nextDup = t),
						  (t._prevDup = this._tail),
						  (t._nextDup = null),
						  (this._tail = t));
				}
				get(t, e) {
					let n;
					for (n = this._head; null !== n; n = n._nextDup)
						if (
							(null === e || e <= n.currentIndex) &&
							Object.is(n.trackById, t)
						)
							return n;
					return null;
				}
				remove(t) {
					const e = t._prevDup,
						n = t._nextDup;
					return (
						null === e ? (this._head = n) : (e._nextDup = n),
						null === n ? (this._tail = e) : (n._prevDup = e),
						null === this._head
					);
				}
			}
			class Hi {
				constructor() {
					this.map = new Map();
				}
				put(t) {
					const e = t.trackById;
					let n = this.map.get(e);
					n || ((n = new Ui()), this.map.set(e, n)), n.add(t);
				}
				get(t, e) {
					const n = this.map.get(t);
					return n ? n.get(t, e) : null;
				}
				remove(t) {
					const e = t.trackById;
					return this.map.get(e).remove(t) && this.map.delete(e), t;
				}
				get isEmpty() {
					return 0 === this.map.size;
				}
				clear() {
					this.map.clear();
				}
			}
			function $i(t, e, n) {
				const r = t.previousIndex;
				if (null === r) return r;
				let s = 0;
				return n && r < n.length && (s = n[r]), r + e + s;
			}
			class zi {
				constructor() {}
				supports(t) {
					return t instanceof Map || Ws(t);
				}
				create() {
					return new qi();
				}
			}
			class qi {
				constructor() {
					(this._records = new Map()),
						(this._mapHead = null),
						(this._appendAfter = null),
						(this._previousMapHead = null),
						(this._changesHead = null),
						(this._changesTail = null),
						(this._additionsHead = null),
						(this._additionsTail = null),
						(this._removalsHead = null),
						(this._removalsTail = null);
				}
				get isDirty() {
					return (
						null !== this._additionsHead ||
						null !== this._changesHead ||
						null !== this._removalsHead
					);
				}
				forEachItem(t) {
					let e;
					for (e = this._mapHead; null !== e; e = e._next) t(e);
				}
				forEachPreviousItem(t) {
					let e;
					for (
						e = this._previousMapHead;
						null !== e;
						e = e._nextPrevious
					)
						t(e);
				}
				forEachChangedItem(t) {
					let e;
					for (e = this._changesHead; null !== e; e = e._nextChanged)
						t(e);
				}
				forEachAddedItem(t) {
					let e;
					for (e = this._additionsHead; null !== e; e = e._nextAdded)
						t(e);
				}
				forEachRemovedItem(t) {
					let e;
					for (e = this._removalsHead; null !== e; e = e._nextRemoved)
						t(e);
				}
				diff(t) {
					if (t) {
						if (!(t instanceof Map || Ws(t)))
							throw new Error(
								`Error trying to diff '${f(
									t
								)}'. Only maps and objects are allowed`
							);
					} else t = new Map();
					return this.check(t) ? this : null;
				}
				onDestroy() {}
				check(t) {
					this._reset();
					let e = this._mapHead;
					if (
						((this._appendAfter = null),
						this._forEach(t, (t, n) => {
							if (e && e.key === n)
								this._maybeAddToChanges(e, t),
									(this._appendAfter = e),
									(e = e._next);
							else {
								const r = this._getOrCreateRecordForKey(n, t);
								e = this._insertBeforeOrAppend(e, r);
							}
						}),
						e)
					) {
						e._prev && (e._prev._next = null),
							(this._removalsHead = e);
						for (let t = e; null !== t; t = t._nextRemoved)
							t === this._mapHead && (this._mapHead = null),
								this._records.delete(t.key),
								(t._nextRemoved = t._next),
								(t.previousValue = t.currentValue),
								(t.currentValue = null),
								(t._prev = null),
								(t._next = null);
					}
					return (
						this._changesTail &&
							(this._changesTail._nextChanged = null),
						this._additionsTail &&
							(this._additionsTail._nextAdded = null),
						this.isDirty
					);
				}
				_insertBeforeOrAppend(t, e) {
					if (t) {
						const n = t._prev;
						return (
							(e._next = t),
							(e._prev = n),
							(t._prev = e),
							n && (n._next = e),
							t === this._mapHead && (this._mapHead = e),
							(this._appendAfter = t),
							t
						);
					}
					return (
						this._appendAfter
							? ((this._appendAfter._next = e),
							  (e._prev = this._appendAfter))
							: (this._mapHead = e),
						(this._appendAfter = e),
						null
					);
				}
				_getOrCreateRecordForKey(t, e) {
					if (this._records.has(t)) {
						const n = this._records.get(t);
						this._maybeAddToChanges(n, e);
						const r = n._prev,
							s = n._next;
						return (
							r && (r._next = s),
							s && (s._prev = r),
							(n._next = null),
							(n._prev = null),
							n
						);
					}
					const n = new Vi(t);
					return (
						this._records.set(t, n),
						(n.currentValue = e),
						this._addToAdditions(n),
						n
					);
				}
				_reset() {
					if (this.isDirty) {
						let t;
						for (
							this._previousMapHead = this._mapHead,
								t = this._previousMapHead;
							null !== t;
							t = t._next
						)
							t._nextPrevious = t._next;
						for (
							t = this._changesHead;
							null !== t;
							t = t._nextChanged
						)
							t.previousValue = t.currentValue;
						for (
							t = this._additionsHead;
							null != t;
							t = t._nextAdded
						)
							t.previousValue = t.currentValue;
						(this._changesHead = this._changesTail = null),
							(this._additionsHead = this._additionsTail = null),
							(this._removalsHead = null);
					}
				}
				_maybeAddToChanges(t, e) {
					Object.is(e, t.currentValue) ||
						((t.previousValue = t.currentValue),
						(t.currentValue = e),
						this._addToChanges(t));
				}
				_addToAdditions(t) {
					null === this._additionsHead
						? (this._additionsHead = this._additionsTail = t)
						: ((this._additionsTail._nextAdded = t),
						  (this._additionsTail = t));
				}
				_addToChanges(t) {
					null === this._changesHead
						? (this._changesHead = this._changesTail = t)
						: ((this._changesTail._nextChanged = t),
						  (this._changesTail = t));
				}
				_forEach(t, e) {
					t instanceof Map
						? t.forEach(e)
						: Object.keys(t).forEach((n) => e(t[n], n));
				}
			}
			class Vi {
				constructor(t) {
					(this.key = t),
						(this.previousValue = null),
						(this.currentValue = null),
						(this._nextPrevious = null),
						(this._next = null),
						(this._prev = null),
						(this._nextAdded = null),
						(this._nextRemoved = null),
						(this._nextChanged = null);
				}
			}
			function Bi() {
				return new Qi([new Di()]);
			}
			let Qi = (() => {
				class t {
					constructor(t) {
						this.factories = t;
					}
					static create(e, n) {
						if (null != n) {
							const t = n.factories.slice();
							e = e.concat(t);
						}
						return new t(e);
					}
					static extend(e) {
						return {
							provide: t,
							useFactory: (n) => t.create(e, n || Bi()),
							deps: [[t, new pn(), new fn()]]
						};
					}
					find(t) {
						const e = this.factories.find((e) => e.supports(t));
						if (null != e) return e;
						throw new Error(
							`Cannot find a differ supporting object '${t}' of type '${
								((n = t), n.name || typeof n)
							}'`
						);
						var n;
					}
				}
				return (
					(t.ɵprov = S({
						token: t,
						providedIn: 'root',
						factory: Bi
					})),
					t
				);
			})();
			function Wi() {
				return new Zi([new zi()]);
			}
			let Zi = (() => {
				class t {
					constructor(t) {
						this.factories = t;
					}
					static create(e, n) {
						if (n) {
							const t = n.factories.slice();
							e = e.concat(t);
						}
						return new t(e);
					}
					static extend(e) {
						return {
							provide: t,
							useFactory: (n) => t.create(e, n || Wi()),
							deps: [[t, new pn(), new fn()]]
						};
					}
					find(t) {
						const e = this.factories.find((e) => e.supports(t));
						if (e) return e;
						throw new Error(
							`Cannot find a differ supporting object '${t}'`
						);
					}
				}
				return (
					(t.ɵprov = S({
						token: t,
						providedIn: 'root',
						factory: Wi
					})),
					t
				);
			})();
			function Gi(t, e, n, r, s = !1) {
				for (; null !== n; ) {
					const i = e[n.index];
					if ((null !== i && r.push(At(i)), ft(i)))
						for (let t = ht; t < i.length; t++) {
							const e = i[t],
								n = e[1].firstChild;
							null !== n && Gi(e[1], e, n, r);
						}
					const o = n.type;
					if (8 & o) Gi(t, e, n.child, r);
					else if (32 & o) {
						const t = ur(n, e);
						let s;
						for (; (s = t()); ) r.push(s);
					} else if (16 & o) {
						const t = Or(e, n);
						if (Array.isArray(t)) r.push(...t);
						else {
							const n = hr(e[16]);
							Gi(n[1], n, t, r, !0);
						}
					}
					n = s ? n.projectionNext : n.next;
				}
				return r;
			}
			class Ki {
				constructor(t, e) {
					(this._lView = t),
						(this._cdRefInjectingView = e),
						(this._appRef = null),
						(this._attachedToViewContainer = !1);
				}
				get rootNodes() {
					const t = this._lView,
						e = t[1];
					return Gi(e, t, e.firstChild, []);
				}
				get context() {
					return this._lView[8];
				}
				get destroyed() {
					return 256 == (256 & this._lView[2]);
				}
				destroy() {
					if (this._appRef) this._appRef.detachView(this);
					else if (this._attachedToViewContainer) {
						const t = this._lView[3];
						if (ft(t)) {
							const e = t[8],
								n = e ? e.indexOf(this) : -1;
							n > -1 && (_r(t, n), tn(e, n));
						}
						this._attachedToViewContainer = !1;
					}
					br(this._lView[1], this._lView);
				}
				onDestroy(t) {
					ns(this._lView[1], this._lView, null, t);
				}
				markForCheck() {
					ys(this._cdRefInjectingView || this._lView);
				}
				detach() {
					this._lView[2] &= -129;
				}
				reattach() {
					this._lView[2] |= 128;
				}
				detectChanges() {
					_s(this._lView[1], this._lView, this.context);
				}
				checkNoChanges() {
					!(function (t, e, n) {
						Zt(!0);
						try {
							_s(t, e, n);
						} finally {
							Zt(!1);
						}
					})(this._lView[1], this._lView, this.context);
				}
				attachToViewContainerRef() {
					if (this._appRef)
						throw new Error(
							'This view is already attached directly to the ApplicationRef!'
						);
					this._attachedToViewContainer = !0;
				}
				detachFromAppRef() {
					var t;
					(this._appRef = null),
						Ir(
							this._lView[1],
							(t = this._lView),
							t[11],
							2,
							null,
							null
						);
				}
				attachToAppRef(t) {
					if (this._attachedToViewContainer)
						throw new Error(
							'This view is already attached to a ViewContainer!'
						);
					this._appRef = t;
				}
			}
			class Ji extends Ki {
				constructor(t) {
					super(t), (this._view = t);
				}
				detectChanges() {
					bs(this._view);
				}
				checkNoChanges() {
					!(function (t) {
						Zt(!0);
						try {
							bs(t);
						} finally {
							Zt(!1);
						}
					})(this._view);
				}
				get context() {
					return null;
				}
			}
			const Xi = to;
			let Yi = (() => {
				class t {}
				return (
					(t.__NG_ELEMENT_ID__ = Xi),
					(t.__ChangeDetectorRef__ = !0),
					t
				);
			})();
			function to(t = !1) {
				return (function (t, e, n) {
					if (!n && mt(t)) {
						const n = Rt(t.index, e);
						return new Ki(n, n);
					}
					return 47 & t.type ? new Ki(e[16], e) : null;
				})(qt(), $t(), t);
			}
			const eo = [new zi()],
				no = new Qi([new Di()]),
				ro = new Zi(eo),
				so = function () {
					return lo(qt(), $t());
				};
			let io = (() => {
				class t {}
				return (t.__NG_ELEMENT_ID__ = so), t;
			})();
			const oo = io,
				ao = class extends oo {
					constructor(t, e, n) {
						super(),
							(this._declarationLView = t),
							(this._declarationTContainer = e),
							(this.elementRef = n);
					}
					createEmbeddedView(t) {
						const e = this._declarationTContainer.tViews,
							n = Wr(
								this._declarationLView,
								e,
								t,
								16,
								null,
								e.declTNode,
								null,
								null,
								null,
								null
							);
						n[17] = this._declarationLView[
							this._declarationTContainer.index
						];
						const r = this._declarationLView[19];
						return (
							null !== r && (n[19] = r.createEmbeddedView(e)),
							Kr(e, n, t),
							new Ki(n)
						);
					}
				};
			function lo(t, e) {
				return 4 & t.type ? new ao(e, t, Ti(t, e)) : null;
			}
			class co {}
			class uo {}
			const ho = function () {
				return _o(qt(), $t());
			};
			let fo = (() => {
				class t {}
				return (t.__NG_ELEMENT_ID__ = ho), t;
			})();
			const po = fo,
				mo = class extends po {
					constructor(t, e, n) {
						super(),
							(this._lContainer = t),
							(this._hostTNode = e),
							(this._hostLView = n);
					}
					get element() {
						return Ti(this._hostTNode, this._hostLView);
					}
					get injector() {
						return new Ve(this._hostTNode, this._hostLView);
					}
					get parentInjector() {
						const t = Re(this._hostTNode, this._hostLView);
						if (Ee(t)) {
							const e = Te(t, this._hostLView),
								n = Ce(t);
							return new Ve(e[1].data[n + 8], e);
						}
						return new Ve(null, this._hostLView);
					}
					clear() {
						for (; this.length > 0; ) this.remove(this.length - 1);
					}
					get(t) {
						const e = go(this._lContainer);
						return (null !== e && e[t]) || null;
					}
					get length() {
						return this._lContainer.length - ht;
					}
					createEmbeddedView(t, e, n) {
						const r = t.createEmbeddedView(e || {});
						return this.insert(r, n), r;
					}
					createComponent(t, e, n, r, s) {
						const i = n || this.parentInjector;
						if (!s && null == t.ngModule && i) {
							const t = i.get(co, null);
							t && (s = t);
						}
						const o = t.create(i, r, void 0, s);
						return this.insert(o.hostView, e), o;
					}
					insert(t, e) {
						const n = t._lView,
							r = n[1];
						if (ft(n[3])) {
							const e = this.indexOf(t);
							if (-1 !== e) this.detach(e);
							else {
								const e = n[3],
									r = new mo(e, e[6], e[3]);
								r.detach(r.indexOf(t));
							}
						}
						const s = this._adjustIndex(e),
							i = this._lContainer;
						!(function (t, e, n, r) {
							const s = ht + r,
								i = n.length;
							r > 0 && (n[s - 1][4] = e),
								r < i - ht
									? ((e[4] = n[s]), Ye(n, ht + r, e))
									: (n.push(e), (e[4] = null)),
								(e[3] = n);
							const o = e[17];
							null !== o &&
								n !== o &&
								(function (t, e) {
									const n = t[9];
									e[16] !== e[3][3][16] && (t[2] = !0),
										null === n ? (t[9] = [e]) : n.push(e);
								})(o, e);
							const a = e[19];
							null !== a && a.insertView(t), (e[2] |= 128);
						})(r, n, i, s);
						const o = kr(s, i),
							a = n[11],
							l = Cr(a, i[7]);
						return (
							null !== l &&
								(function (t, e, n, r, s, i) {
									(r[0] = s),
										(r[6] = e),
										Ir(t, r, n, 1, s, i);
								})(r, i[6], a, n, l, o),
							t.attachToViewContainerRef(),
							Ye(yo(i), s, t),
							t
						);
					}
					move(t, e) {
						return this.insert(t, e);
					}
					indexOf(t) {
						const e = go(this._lContainer);
						return null !== e ? e.indexOf(t) : -1;
					}
					remove(t) {
						const e = this._adjustIndex(t, -1),
							n = _r(this._lContainer, e);
						n && (tn(yo(this._lContainer), e), br(n[1], n));
					}
					detach(t) {
						const e = this._adjustIndex(t, -1),
							n = _r(this._lContainer, e);
						return n && null != tn(yo(this._lContainer), e)
							? new Ki(n)
							: null;
					}
					_adjustIndex(t, e = 0) {
						return null == t ? this.length + e : t;
					}
				};
			function go(t) {
				return t[8];
			}
			function yo(t) {
				return t[8] || (t[8] = []);
			}
			function _o(t, e) {
				let n;
				const r = e[t.index];
				if (ft(r)) n = r;
				else {
					let s;
					if (8 & t.type) s = At(r);
					else {
						const n = e[11];
						s = n.createComment('');
						const r = It(t, e);
						wr(
							n,
							Cr(n, r),
							s,
							(function (t, e) {
								return Ot(t) ? t.nextSibling(e) : e.nextSibling;
							})(n, r),
							!1
						);
					}
					(e[t.index] = n = new Array(
						r,
						!0,
						!1,
						e,
						null,
						0,
						t,
						s,
						null,
						null
					)),
						gs(e, n);
				}
				return new mo(n, t, e);
			}
			const bo = {};
			class vo extends Ei {
				constructor(t) {
					super(), (this.ngModule = t);
				}
				resolveComponentFactory(t) {
					const e = lt(t);
					return new Eo(e, this.ngModule);
				}
			}
			function wo(t) {
				const e = [];
				for (let n in t)
					t.hasOwnProperty(n) &&
						e.push({ propName: t[n], templateName: n });
				return e;
			}
			const So = new Ze('SCHEDULER_TOKEN', {
				providedIn: 'root',
				factory: () => ar
			});
			class Eo extends wi {
				constructor(t, e) {
					super(),
						(this.componentDef = t),
						(this.ngModule = e),
						(this.componentType = t.type),
						(this.selector = t.selectors.map(Vr).join(',')),
						(this.ngContentSelectors = t.ngContentSelectors
							? t.ngContentSelectors
							: []),
						(this.isBoundToModule = !!e);
				}
				get inputs() {
					return wo(this.componentDef.inputs);
				}
				get outputs() {
					return wo(this.componentDef.outputs);
				}
				create(t, e, n, r) {
					const s = (r = r || this.ngModule)
							? (function (t, e) {
									return {
										get: (n, r, s) => {
											const i = t.get(n, bo, s);
											return i !== bo || r === bo
												? i
												: e.get(n, r, s);
										}
									};
							  })(t, r.injector)
							: t,
						i = s.get(Ai, kt),
						o = s.get(Ri, null),
						a = i.createRenderer(null, this.componentDef),
						l = this.componentDef.selectors[0][0] || 'div',
						c = n
							? (function (t, e, n) {
									if (Ot(t))
										return t.selectRootElement(
											e,
											n === L.ShadowDom
										);
									let r =
										'string' == typeof e
											? t.querySelector(e)
											: e;
									return (r.textContent = ''), r;
							  })(a, n, this.componentDef.encapsulation)
							: gr(
									i.createRenderer(null, this.componentDef),
									l,
									(function (t) {
										const e = t.toLowerCase();
										return 'svg' === e
											? 'http://www.w3.org/2000/svg'
											: 'math' === e
											? 'http://www.w3.org/1998/MathML/'
											: null;
									})(l)
							  ),
						u = this.componentDef.onPush ? 576 : 528,
						h = {
							components: [],
							scheduler: ar,
							clean: ws,
							playerHandler: null,
							flags: 0
						},
						d = es(
							0,
							null,
							null,
							1,
							0,
							null,
							null,
							null,
							null,
							null
						),
						f = Wr(null, d, h, u, null, null, i, a, o, s);
					let p, m;
					ne(f);
					try {
						const t = (function (t, e, n, r, s, i) {
							const o = n[1];
							n[20] = t;
							const a = Zr(o, 20, 2, '#host', null),
								l = (a.mergedAttrs = e.hostAttrs);
							null !== l &&
								(xs(a, l, !0),
								null !== t &&
									(_e(s, t, l),
									null !== a.classes && Pr(s, t, a.classes),
									null !== a.styles && Rr(s, t, a.styles)));
							const c = r.createRenderer(t, e),
								u = Wr(
									n,
									ts(e),
									null,
									e.onPush ? 64 : 16,
									n[20],
									a,
									r,
									c,
									null,
									null
								);
							return (
								o.firstCreatePass &&
									(Pe(Ae(a, n), o, e.type),
									os(o, a),
									ls(a, n.length, 1)),
								gs(n, u),
								(n[20] = u)
							);
						})(c, this.componentDef, f, i, a);
						if (c)
							if (n) _e(a, c, ['ng-version', Ni.full]);
							else {
								const { attrs: t, classes: e } = (function (t) {
									const e = [],
										n = [];
									let r = 1,
										s = 2;
									for (; r < t.length; ) {
										let i = t[r];
										if ('string' == typeof i)
											2 === s
												? '' !== i && e.push(i, t[++r])
												: 8 === s && n.push(i);
										else {
											if (!Hr(s)) break;
											s = i;
										}
										r++;
									}
									return { attrs: e, classes: n };
								})(this.componentDef.selectors[0]);
								t && _e(a, c, t),
									e && e.length > 0 && Pr(a, c, e.join(' '));
							}
						if (((m = jt(d, ut)), void 0 !== e)) {
							const t = (m.projection = []);
							for (
								let n = 0;
								n < this.ngContentSelectors.length;
								n++
							) {
								const r = e[n];
								t.push(null != r ? Array.from(r) : null);
							}
						}
						(p = (function (t, e, n, r, s) {
							const i = n[1],
								o = (function (t, e, n) {
									const r = qt();
									t.firstCreatePass &&
										(n.providersResolver &&
											n.providersResolver(n),
										cs(t, r, e, Gr(t, e, 1, null), n));
									const s = $e(e, t, r.directiveStart, r);
									or(s, e);
									const i = It(r, e);
									return i && or(i, e), s;
								})(i, n, e);
							if (
								(r.components.push(o),
								(t[8] = o),
								s && s.forEach((t) => t(o, e)),
								e.contentQueries)
							) {
								const t = qt();
								e.contentQueries(1, o, t.directiveStart);
							}
							const a = qt();
							return (
								!i.firstCreatePass ||
									(null === e.hostBindings &&
										null === e.hostAttrs) ||
									(le(a.index),
									ss(
										n[1],
										a,
										0,
										a.directiveStart,
										a.directiveEnd,
										e
									),
									is(e, o)),
								o
							);
						})(t, this.componentDef, f, h, [qs])),
							Kr(d, f, null);
					} finally {
						ae();
					}
					return new Co(this.componentType, p, Ti(m, f), f, m);
				}
			}
			class Co extends class {} {
				constructor(t, e, n, r, s) {
					super(),
						(this.location = n),
						(this._rootLView = r),
						(this._tNode = s),
						(this.instance = e),
						(this.hostView = this.changeDetectorRef = new Ji(r)),
						(this.componentType = t);
				}
				get injector() {
					return new Ve(this._tNode, this._rootLView);
				}
				destroy() {
					this.hostView.destroy();
				}
				onDestroy(t) {
					this.hostView.onDestroy(t);
				}
			}
			const To = new Map();
			class xo extends co {
				constructor(t, e) {
					super(),
						(this._parent = e),
						(this._bootstrapComponents = []),
						(this.injector = this),
						(this.destroyCbs = []),
						(this.componentFactoryResolver = new vo(this));
					const n = ct(t),
						r = t[G] || null;
					r && vi(r),
						(this._bootstrapComponents = lr(n.bootstrap)),
						(this._r3Injector = Ds(
							t,
							e,
							[
								{ provide: co, useValue: this },
								{
									provide: Ei,
									useValue: this.componentFactoryResolver
								}
							],
							f(t)
						)),
						this._r3Injector._resolveInjectorDefTypes(),
						(this.instance = this.get(t));
				}
				get(t, e = zs.THROW_IF_NOT_FOUND, n = j.Default) {
					return t === zs || t === co || t === Os
						? this
						: this._r3Injector.get(t, e, n);
				}
				destroy() {
					const t = this._r3Injector;
					!t.destroyed && t.destroy(),
						this.destroyCbs.forEach((t) => t()),
						(this.destroyCbs = null);
				}
				onDestroy(t) {
					this.destroyCbs.push(t);
				}
			}
			class Oo extends uo {
				constructor(t) {
					super(),
						(this.moduleType = t),
						null !== ct(t) &&
							(function (t) {
								const e = new Set();
								!(function t(n) {
									const r = ct(n, !0),
										s = r.id;
									null !== s &&
										((function (t, e, n) {
											if (e && e !== n)
												throw new Error(
													`Duplicate module registered for ${t} - ${f(
														e
													)} vs ${f(e.name)}`
												);
										})(s, To.get(s), n),
										To.set(s, n));
									const i = lr(r.imports);
									for (const o of i)
										e.has(o) || (e.add(o), t(o));
								})(t);
							})(t);
				}
				create(t) {
					return new xo(this.moduleType, t);
				}
			}
			const ko = class extends r.a {
				constructor(t = !1) {
					super(), (this.__isAsync = t);
				}
				emit(t) {
					super.next(t);
				}
				subscribe(t, e, n) {
					let r,
						i = (t) => null,
						o = () => null;
					t && 'object' == typeof t
						? ((r = this.__isAsync
								? (e) => {
										setTimeout(() => t.next(e));
								  }
								: (e) => {
										t.next(e);
								  }),
						  t.error &&
								(i = this.__isAsync
									? (e) => {
											setTimeout(() => t.error(e));
									  }
									: (e) => {
											t.error(e);
									  }),
						  t.complete &&
								(o = this.__isAsync
									? () => {
											setTimeout(() => t.complete());
									  }
									: () => {
											t.complete();
									  }))
						: ((r = this.__isAsync
								? (e) => {
										setTimeout(() => t(e));
								  }
								: (e) => {
										t(e);
								  }),
						  e &&
								(i = this.__isAsync
									? (t) => {
											setTimeout(() => e(t));
									  }
									: (t) => {
											e(t);
									  }),
						  n &&
								(o = this.__isAsync
									? () => {
											setTimeout(() => n());
									  }
									: () => {
											n();
									  }));
					const a = super.subscribe(r, i, o);
					return t instanceof s.a && t.add(a), a;
				}
			};
			function Ao() {
				return this._results[Bs()]();
			}
			class Io {
				constructor(t = !1) {
					(this._emitDistinctChangesOnly = t),
						(this.dirty = !0),
						(this._results = []),
						(this._changesDetected = !1),
						(this._changes = null),
						(this.length = 0),
						(this.first = void 0),
						(this.last = void 0);
					const e = Bs(),
						n = Io.prototype;
					n[e] || (n[e] = Ao);
				}
				get changes() {
					return this._changes || (this._changes = new ko());
				}
				get(t) {
					return this._results[t];
				}
				map(t) {
					return this._results.map(t);
				}
				filter(t) {
					return this._results.filter(t);
				}
				find(t) {
					return this._results.find(t);
				}
				reduce(t, e) {
					return this._results.reduce(t, e);
				}
				forEach(t) {
					this._results.forEach(t);
				}
				some(t) {
					return this._results.some(t);
				}
				toArray() {
					return this._results.slice();
				}
				toString() {
					return this._results.toString();
				}
				reset(t, e) {
					const n = this;
					n.dirty = !1;
					const r = Je(t);
					(this._changesDetected = !(function (t, e, n) {
						if (t.length !== e.length) return !1;
						for (let r = 0; r < t.length; r++) {
							let s = t[r],
								i = e[r];
							if ((n && ((s = n(s)), (i = n(i))), i !== s))
								return !1;
						}
						return !0;
					})(n._results, r, e)) &&
						((n._results = r),
						(n.length = r.length),
						(n.last = r[this.length - 1]),
						(n.first = r[0]));
				}
				notifyOnChanges() {
					!this._changes ||
						(!this._changesDetected &&
							this._emitDistinctChangesOnly) ||
						this._changes.emit(this);
				}
				setDirty() {
					this.dirty = !0;
				}
				destroy() {
					this.changes.complete(), this.changes.unsubscribe();
				}
			}
			class jo {
				constructor(t) {
					(this.queryList = t), (this.matches = null);
				}
				clone() {
					return new jo(this.queryList);
				}
				setDirty() {
					this.queryList.setDirty();
				}
			}
			class Ro {
				constructor(t = []) {
					this.queries = t;
				}
				createEmbeddedView(t) {
					const e = t.queries;
					if (null !== e) {
						const n =
								null !== t.contentQueries
									? t.contentQueries[0]
									: e.length,
							r = [];
						for (let t = 0; t < n; t++) {
							const n = e.getByIndex(t);
							r.push(
								this.queries[n.indexInDeclarationView].clone()
							);
						}
						return new Ro(r);
					}
					return null;
				}
				insertView(t) {
					this.dirtyQueriesWithMatches(t);
				}
				detachView(t) {
					this.dirtyQueriesWithMatches(t);
				}
				dirtyQueriesWithMatches(t) {
					for (let e = 0; e < this.queries.length; e++)
						null !== qo(t, e).matches && this.queries[e].setDirty();
				}
			}
			class Po {
				constructor(t, e, n = null) {
					(this.predicate = t), (this.flags = e), (this.read = n);
				}
			}
			class No {
				constructor(t = []) {
					this.queries = t;
				}
				elementStart(t, e) {
					for (let n = 0; n < this.queries.length; n++)
						this.queries[n].elementStart(t, e);
				}
				elementEnd(t) {
					for (let e = 0; e < this.queries.length; e++)
						this.queries[e].elementEnd(t);
				}
				embeddedTView(t) {
					let e = null;
					for (let n = 0; n < this.length; n++) {
						const r = null !== e ? e.length : 0,
							s = this.getByIndex(n).embeddedTView(t, r);
						s &&
							((s.indexInDeclarationView = n),
							null !== e ? e.push(s) : (e = [s]));
					}
					return null !== e ? new No(e) : null;
				}
				template(t, e) {
					for (let n = 0; n < this.queries.length; n++)
						this.queries[n].template(t, e);
				}
				getByIndex(t) {
					return this.queries[t];
				}
				get length() {
					return this.queries.length;
				}
				track(t) {
					this.queries.push(t);
				}
			}
			class Do {
				constructor(t, e = -1) {
					(this.metadata = t),
						(this.matches = null),
						(this.indexInDeclarationView = -1),
						(this.crossesNgTemplate = !1),
						(this._appliesToNextNode = !0),
						(this._declarationNodeIndex = e);
				}
				elementStart(t, e) {
					this.isApplyingToNode(e) && this.matchTNode(t, e);
				}
				elementEnd(t) {
					this._declarationNodeIndex === t.index &&
						(this._appliesToNextNode = !1);
				}
				template(t, e) {
					this.elementStart(t, e);
				}
				embeddedTView(t, e) {
					return this.isApplyingToNode(t)
						? ((this.crossesNgTemplate = !0),
						  this.addMatch(-t.index, e),
						  new Do(this.metadata))
						: null;
				}
				isApplyingToNode(t) {
					if (
						this._appliesToNextNode &&
						1 != (1 & this.metadata.flags)
					) {
						const e = this._declarationNodeIndex;
						let n = t.parent;
						for (; null !== n && 8 & n.type && n.index !== e; )
							n = n.parent;
						return e === (null !== n ? n.index : -1);
					}
					return this._appliesToNextNode;
				}
				matchTNode(t, e) {
					const n = this.metadata.predicate;
					if (Array.isArray(n))
						for (let r = 0; r < n.length; r++) {
							const s = n[r];
							this.matchTNodeWithReadOption(t, e, Fo(e, s)),
								this.matchTNodeWithReadOption(
									t,
									e,
									He(e, t, s, !1, !1)
								);
						}
					else
						n === io
							? 4 & e.type &&
							  this.matchTNodeWithReadOption(t, e, -1)
							: this.matchTNodeWithReadOption(
									t,
									e,
									He(e, t, n, !1, !1)
							  );
				}
				matchTNodeWithReadOption(t, e, n) {
					if (null !== n) {
						const r = this.metadata.read;
						if (null !== r)
							if (
								r === Oi ||
								r === fo ||
								(r === io && 4 & e.type)
							)
								this.addMatch(e.index, -2);
							else {
								const n = He(e, t, r, !1, !1);
								null !== n && this.addMatch(e.index, n);
							}
						else this.addMatch(e.index, n);
					}
				}
				addMatch(t, e) {
					null === this.matches
						? (this.matches = [t, e])
						: this.matches.push(t, e);
				}
			}
			function Fo(t, e) {
				const n = t.localNames;
				if (null !== n)
					for (let r = 0; r < n.length; r += 2)
						if (n[r] === e) return n[r + 1];
				return null;
			}
			function Lo(t, e, n, r) {
				return -1 === n
					? (function (t, e) {
							return 11 & t.type
								? Ti(t, e)
								: 4 & t.type
								? lo(t, e)
								: null;
					  })(e, t)
					: -2 === n
					? (function (t, e, n) {
							return n === Oi
								? Ti(e, t)
								: n === io
								? lo(e, t)
								: n === fo
								? _o(e, t)
								: void 0;
					  })(t, e, r)
					: $e(t, t[1], n, e);
			}
			function Mo(t, e, n, r) {
				const s = e[19].queries[r];
				if (null === s.matches) {
					const r = t.data,
						i = n.matches,
						o = [];
					for (let t = 0; t < i.length; t += 2) {
						const s = i[t];
						o.push(
							s < 0
								? null
								: Lo(e, r[s], i[t + 1], n.metadata.read)
						);
					}
					s.matches = o;
				}
				return s.matches;
			}
			function Uo(t, e, n, r) {
				const s = t.queries.getByIndex(n),
					i = s.matches;
				if (null !== i) {
					const o = Mo(t, e, s, n);
					for (let t = 0; t < i.length; t += 2) {
						const n = i[t];
						if (n > 0) r.push(o[t / 2]);
						else {
							const s = i[t + 1],
								o = e[-n];
							for (let t = ht; t < o.length; t++) {
								const e = o[t];
								e[17] === e[3] && Uo(e[1], e, s, r);
							}
							if (null !== o[9]) {
								const t = o[9];
								for (let e = 0; e < t.length; e++) {
									const n = t[e];
									Uo(n[1], n, s, r);
								}
							}
						}
					}
				}
				return r;
			}
			function Ho(t) {
				const e = $t(),
					n = zt(),
					r = Xt();
				Yt(r + 1);
				const s = qo(n, r);
				if (t.dirty && Nt(e) === (2 == (2 & s.metadata.flags))) {
					if (null === s.matches) t.reset([]);
					else {
						const i = s.crossesNgTemplate
							? Uo(n, e, r, [])
							: Mo(n, e, s, r);
						t.reset(i, ki), t.notifyOnChanges();
					}
					return !0;
				}
				return !1;
			}
			function $o(t, e, n, r) {
				const s = zt();
				if (s.firstCreatePass) {
					const i = qt();
					(function (t, e, n) {
						null === t.queries && (t.queries = new No()),
							t.queries.track(new Do(e, n));
					})(s, new Po(e, n, r), i.index),
						(function (t, e) {
							const n =
								t.contentQueries || (t.contentQueries = []);
							e !== (n.length ? n[n.length - 1] : -1) &&
								n.push(t.queries.length - 1, e);
						})(s, t),
						2 == (2 & n) && (s.staticContentQueries = !0);
				}
				!(function (t, e, n) {
					const r = new Io(4 == (4 & n));
					ns(t, e, r, r.destroy),
						null === e[19] && (e[19] = new Ro()),
						e[19].queries.push(new jo(r));
				})(s, $t(), n);
			}
			function zo() {
				return (t = $t()), (e = Xt()), t[19].queries[e].queryList;
				var t, e;
			}
			function qo(t, e) {
				return t.queries.getByIndex(e);
			}
			function Vo(t = j.Default) {
				const e = to(!0);
				if (null != e || t & j.Optional) return e;
				w('ChangeDetectorRef');
			}
			const Bo = new Ze('Application Initializer');
			let Qo = (() => {
				class t {
					constructor(t) {
						(this.appInits = t),
							(this.resolve = Ci),
							(this.reject = Ci),
							(this.initialized = !1),
							(this.done = !1),
							(this.donePromise = new Promise((t, e) => {
								(this.resolve = t), (this.reject = e);
							}));
					}
					runInitializers() {
						if (this.initialized) return;
						const t = [],
							e = () => {
								(this.done = !0), this.resolve();
							};
						if (this.appInits)
							for (let n = 0; n < this.appInits.length; n++) {
								const e = this.appInits[n]();
								ei(e) && t.push(e);
							}
						Promise.all(t)
							.then(() => {
								e();
							})
							.catch((t) => {
								this.reject(t);
							}),
							0 === t.length && e(),
							(this.initialized = !0);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(cn(Bo, 8));
					}),
					(t.ɵprov = S({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const Wo = new Ze('AppId'),
				Zo = {
					provide: Wo,
					useFactory: function () {
						return `${Go()}${Go()}${Go()}`;
					},
					deps: []
				};
			function Go() {
				return String.fromCharCode(97 + Math.floor(25 * Math.random()));
			}
			const Ko = new Ze('Platform Initializer'),
				Jo = new Ze('Platform ID'),
				Xo = new Ze('appBootstrapListener');
			let Yo = (() => {
				class t {
					log(t) {
						console.log(t);
					}
					warn(t) {
						console.warn(t);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵprov = S({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const ta = new Ze('LocaleId'),
				ea = new Ze('DefaultCurrencyCode');
			class na {
				constructor(t, e) {
					(this.ngModuleFactory = t), (this.componentFactories = e);
				}
			}
			const ra = function (t) {
					return new Oo(t);
				},
				sa = ra,
				ia = function (t) {
					return Promise.resolve(ra(t));
				},
				oa = function (t) {
					const e = ra(t),
						n = lr(ct(t).declarations).reduce((t, e) => {
							const n = lt(e);
							return n && t.push(new Eo(n)), t;
						}, []);
					return new na(e, n);
				},
				aa = oa,
				la = function (t) {
					return Promise.resolve(oa(t));
				};
			let ca = (() => {
				class t {
					constructor() {
						(this.compileModuleSync = sa),
							(this.compileModuleAsync = ia),
							(this.compileModuleAndAllComponentsSync = aa),
							(this.compileModuleAndAllComponentsAsync = la);
					}
					clearCache() {}
					clearCacheFor(t) {}
					getModuleId(t) {}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵprov = S({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const ua = (() => Promise.resolve(0))();
			function ha(t) {
				'undefined' == typeof Zone
					? ua.then(() => {
							t && t.apply(null, null);
					  })
					: Zone.current.scheduleMicroTask('scheduleMicrotask', t);
			}
			class da {
				constructor({
					enableLongStackTrace: t = !1,
					shouldCoalesceEventChangeDetection: e = !1,
					shouldCoalesceRunChangeDetection: n = !1
				}) {
					if (
						((this.hasPendingMacrotasks = !1),
						(this.hasPendingMicrotasks = !1),
						(this.isStable = !0),
						(this.onUnstable = new ko(!1)),
						(this.onMicrotaskEmpty = new ko(!1)),
						(this.onStable = new ko(!1)),
						(this.onError = new ko(!1)),
						'undefined' == typeof Zone)
					)
						throw new Error(
							'In this configuration Angular requires Zone.js'
						);
					Zone.assertZonePatched();
					const r = this;
					(r._nesting = 0),
						(r._outer = r._inner = Zone.current),
						Zone.TaskTrackingZoneSpec &&
							(r._inner = r._inner.fork(
								new Zone.TaskTrackingZoneSpec()
							)),
						t &&
							Zone.longStackTraceZoneSpec &&
							(r._inner = r._inner.fork(
								Zone.longStackTraceZoneSpec
							)),
						(r.shouldCoalesceEventChangeDetection = !n && e),
						(r.shouldCoalesceRunChangeDetection = n),
						(r.lastRequestAnimationFrameId = -1),
						(r.nativeRequestAnimationFrame = (function () {
							let t = z.requestAnimationFrame,
								e = z.cancelAnimationFrame;
							if ('undefined' != typeof Zone && t && e) {
								const n =
									t[Zone.__symbol__('OriginalDelegate')];
								n && (t = n);
								const r =
									e[Zone.__symbol__('OriginalDelegate')];
								r && (e = r);
							}
							return {
								nativeRequestAnimationFrame: t,
								nativeCancelAnimationFrame: e
							};
						})().nativeRequestAnimationFrame),
						(function (t) {
							const e = () => {
								!(function (t) {
									-1 === t.lastRequestAnimationFrameId &&
										((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
											z,
											() => {
												t.fakeTopEventTask ||
													(t.fakeTopEventTask = Zone.root.scheduleEventTask(
														'fakeTopEventTask',
														() => {
															(t.lastRequestAnimationFrameId = -1),
																ma(t),
																pa(t);
														},
														void 0,
														() => {},
														() => {}
													)),
													t.fakeTopEventTask.invoke();
											}
										)),
										ma(t));
								})(t);
							};
							t._inner = t._inner.fork({
								name: 'angular',
								properties: { isAngularZone: !0 },
								onInvokeTask: (n, r, s, i, o, a) => {
									try {
										return ga(t), n.invokeTask(s, i, o, a);
									} finally {
										((t.shouldCoalesceEventChangeDetection &&
											'eventTask' === i.type) ||
											t.shouldCoalesceRunChangeDetection) &&
											e(),
											ya(t);
									}
								},
								onInvoke: (n, r, s, i, o, a, l) => {
									try {
										return ga(t), n.invoke(s, i, o, a, l);
									} finally {
										t.shouldCoalesceRunChangeDetection &&
											e(),
											ya(t);
									}
								},
								onHasTask: (e, n, r, s) => {
									e.hasTask(r, s),
										n === r &&
											('microTask' == s.change
												? ((t._hasPendingMicrotasks =
														s.microTask),
												  ma(t),
												  pa(t))
												: 'macroTask' == s.change &&
												  (t.hasPendingMacrotasks =
														s.macroTask));
								},
								onHandleError: (e, n, r, s) => (
									e.handleError(r, s),
									t.runOutsideAngular(() =>
										t.onError.emit(s)
									),
									!1
								)
							});
						})(r);
				}
				static isInAngularZone() {
					return !0 === Zone.current.get('isAngularZone');
				}
				static assertInAngularZone() {
					if (!da.isInAngularZone())
						throw new Error(
							'Expected to be in Angular Zone, but it is not!'
						);
				}
				static assertNotInAngularZone() {
					if (da.isInAngularZone())
						throw new Error(
							'Expected to not be in Angular Zone, but it is!'
						);
				}
				run(t, e, n) {
					return this._inner.run(t, e, n);
				}
				runTask(t, e, n, r) {
					const s = this._inner,
						i = s.scheduleEventTask(
							'NgZoneEvent: ' + r,
							t,
							fa,
							Ci,
							Ci
						);
					try {
						return s.runTask(i, e, n);
					} finally {
						s.cancelTask(i);
					}
				}
				runGuarded(t, e, n) {
					return this._inner.runGuarded(t, e, n);
				}
				runOutsideAngular(t) {
					return this._outer.run(t);
				}
			}
			const fa = {};
			function pa(t) {
				if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
					try {
						t._nesting++, t.onMicrotaskEmpty.emit(null);
					} finally {
						if ((t._nesting--, !t.hasPendingMicrotasks))
							try {
								t.runOutsideAngular(() =>
									t.onStable.emit(null)
								);
							} finally {
								t.isStable = !0;
							}
					}
			}
			function ma(t) {
				t.hasPendingMicrotasks = !!(
					t._hasPendingMicrotasks ||
					((t.shouldCoalesceEventChangeDetection ||
						t.shouldCoalesceRunChangeDetection) &&
						-1 !== t.lastRequestAnimationFrameId)
				);
			}
			function ga(t) {
				t._nesting++,
					t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
			}
			function ya(t) {
				t._nesting--, pa(t);
			}
			class _a {
				constructor() {
					(this.hasPendingMicrotasks = !1),
						(this.hasPendingMacrotasks = !1),
						(this.isStable = !0),
						(this.onUnstable = new ko()),
						(this.onMicrotaskEmpty = new ko()),
						(this.onStable = new ko()),
						(this.onError = new ko());
				}
				run(t, e, n) {
					return t.apply(e, n);
				}
				runGuarded(t, e, n) {
					return t.apply(e, n);
				}
				runOutsideAngular(t) {
					return t();
				}
				runTask(t, e, n, r) {
					return t.apply(e, n);
				}
			}
			let ba = (() => {
					class t {
						constructor(t) {
							(this._ngZone = t),
								(this._pendingCount = 0),
								(this._isZoneStable = !0),
								(this._didWork = !1),
								(this._callbacks = []),
								(this.taskTrackingZone = null),
								this._watchAngularEvents(),
								t.run(() => {
									this.taskTrackingZone =
										'undefined' == typeof Zone
											? null
											: Zone.current.get(
													'TaskTrackingZone'
											  );
								});
						}
						_watchAngularEvents() {
							this._ngZone.onUnstable.subscribe({
								next: () => {
									(this._didWork = !0),
										(this._isZoneStable = !1);
								}
							}),
								this._ngZone.runOutsideAngular(() => {
									this._ngZone.onStable.subscribe({
										next: () => {
											da.assertNotInAngularZone(),
												ha(() => {
													(this._isZoneStable = !0),
														this._runCallbacksIfReady();
												});
										}
									});
								});
						}
						increasePendingRequestCount() {
							return (
								(this._pendingCount += 1),
								(this._didWork = !0),
								this._pendingCount
							);
						}
						decreasePendingRequestCount() {
							if (
								((this._pendingCount -= 1),
								this._pendingCount < 0)
							)
								throw new Error(
									'pending async requests below zero'
								);
							return (
								this._runCallbacksIfReady(), this._pendingCount
							);
						}
						isStable() {
							return (
								this._isZoneStable &&
								0 === this._pendingCount &&
								!this._ngZone.hasPendingMacrotasks
							);
						}
						_runCallbacksIfReady() {
							if (this.isStable())
								ha(() => {
									for (; 0 !== this._callbacks.length; ) {
										let t = this._callbacks.pop();
										clearTimeout(t.timeoutId),
											t.doneCb(this._didWork);
									}
									this._didWork = !1;
								});
							else {
								let t = this.getPendingTasks();
								(this._callbacks = this._callbacks.filter(
									(e) =>
										!e.updateCb ||
										!e.updateCb(t) ||
										(clearTimeout(e.timeoutId), !1)
								)),
									(this._didWork = !0);
							}
						}
						getPendingTasks() {
							return this.taskTrackingZone
								? this.taskTrackingZone.macroTasks.map((t) => ({
										source: t.source,
										creationLocation: t.creationLocation,
										data: t.data
								  }))
								: [];
						}
						addCallback(t, e, n) {
							let r = -1;
							e &&
								e > 0 &&
								(r = setTimeout(() => {
									(this._callbacks = this._callbacks.filter(
										(t) => t.timeoutId !== r
									)),
										t(
											this._didWork,
											this.getPendingTasks()
										);
								}, e)),
								this._callbacks.push({
									doneCb: t,
									timeoutId: r,
									updateCb: n
								});
						}
						whenStable(t, e, n) {
							if (n && !this.taskTrackingZone)
								throw new Error(
									'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
								);
							this.addCallback(t, e, n),
								this._runCallbacksIfReady();
						}
						getPendingRequestCount() {
							return this._pendingCount;
						}
						findProviders(t, e, n) {
							return [];
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(cn(da));
						}),
						(t.ɵprov = S({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				va = (() => {
					class t {
						constructor() {
							(this._applications = new Map()),
								Ca.addToWindow(this);
						}
						registerApplication(t, e) {
							this._applications.set(t, e);
						}
						unregisterApplication(t) {
							this._applications.delete(t);
						}
						unregisterAllApplications() {
							this._applications.clear();
						}
						getTestability(t) {
							return this._applications.get(t) || null;
						}
						getAllTestabilities() {
							return Array.from(this._applications.values());
						}
						getAllRootElements() {
							return Array.from(this._applications.keys());
						}
						findTestabilityInTree(t, e = !0) {
							return Ca.findTestabilityInTree(this, t, e);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵprov = S({ token: t, factory: t.ɵfac })),
						t
					);
				})();
			class wa {
				addToWindow(t) {}
				findTestabilityInTree(t, e, n) {
					return null;
				}
			}
			function Sa(t) {
				Ca = t;
			}
			let Ea,
				Ca = new wa(),
				Ta = !0,
				xa = !1;
			function Oa() {
				if (xa)
					throw new Error(
						'Cannot enable prod mode after platform setup.'
					);
				Ta = !1;
			}
			const ka = new Ze('AllowMultipleToken');
			class Aa {
				constructor(t, e) {
					(this.name = t), (this.token = e);
				}
			}
			function Ia(t, e, n = []) {
				const r = `Platform: ${e}`,
					s = new Ze(r);
				return (e = []) => {
					let i = ja();
					if (!i || i.injector.get(ka, !1))
						if (t)
							t(n.concat(e).concat({ provide: s, useValue: !0 }));
						else {
							const t = n
								.concat(e)
								.concat(
									{ provide: s, useValue: !0 },
									{ provide: As, useValue: 'platform' }
								);
							!(function (t) {
								if (
									Ea &&
									!Ea.destroyed &&
									!Ea.injector.get(ka, !1)
								)
									throw new Error(
										'There can be only one platform. Destroy the previous one to create a new one.'
									);
								Ea = t.get(Ra);
								const e = t.get(Ko, null);
								e && e.forEach((t) => t());
							})(zs.create({ providers: t, name: r }));
						}
					return (function (t) {
						const e = ja();
						if (!e) throw new Error('No platform exists!');
						if (!e.injector.get(t, null))
							throw new Error(
								'A platform with a different configuration has been created. Please destroy it first.'
							);
						return e;
					})(s);
				};
			}
			function ja() {
				return Ea && !Ea.destroyed ? Ea : null;
			}
			let Ra = (() => {
				class t {
					constructor(t) {
						(this._injector = t),
							(this._modules = []),
							(this._destroyListeners = []),
							(this._destroyed = !1);
					}
					bootstrapModuleFactory(t, e) {
						const n = (function (t, e) {
								let n;
								return (
									(n =
										'noop' === t
											? new _a()
											: ('zone.js' === t ? void 0 : t) ||
											  new da({
													enableLongStackTrace:
														((xa = !0), Ta),
													shouldCoalesceEventChangeDetection: !!(null ==
													e
														? void 0
														: e.ngZoneEventCoalescing),
													shouldCoalesceRunChangeDetection: !!(null ==
													e
														? void 0
														: e.ngZoneRunCoalescing)
											  })),
									n
								);
							})(e ? e.ngZone : void 0, {
								ngZoneEventCoalescing:
									(e && e.ngZoneEventCoalescing) || !1,
								ngZoneRunCoalescing:
									(e && e.ngZoneRunCoalescing) || !1
							}),
							r = [{ provide: da, useValue: n }];
						return n.run(() => {
							const e = zs.create({
									providers: r,
									parent: this.injector,
									name: t.moduleType.name
								}),
								s = t.create(e),
								i = s.injector.get(ir, null);
							if (!i)
								throw new Error(
									'No ErrorHandler. Is platform module (BrowserModule) included?'
								);
							return (
								n.runOutsideAngular(() => {
									const t = n.onError.subscribe({
										next: (t) => {
											i.handleError(t);
										}
									});
									s.onDestroy(() => {
										Da(this._modules, s), t.unsubscribe();
									});
								}),
								(function (t, e, n) {
									try {
										const r = n();
										return ei(r)
											? r.catch((n) => {
													throw (
														(e.runOutsideAngular(
															() =>
																t.handleError(n)
														),
														n)
													);
											  })
											: r;
									} catch (r) {
										throw (
											(e.runOutsideAngular(() =>
												t.handleError(r)
											),
											r)
										);
									}
								})(i, n, () => {
									const t = s.injector.get(Qo);
									return (
										t.runInitializers(),
										t.donePromise.then(
											() => (
												vi(
													s.injector.get(ta, _i) || _i
												),
												this._moduleDoBootstrap(s),
												s
											)
										)
									);
								})
							);
						});
					}
					bootstrapModule(t, e = []) {
						const n = Pa({}, e);
						return (function (t, e, n) {
							const r = new Oo(n);
							return Promise.resolve(r);
						})(0, 0, t).then((t) =>
							this.bootstrapModuleFactory(t, n)
						);
					}
					_moduleDoBootstrap(t) {
						const e = t.injector.get(Na);
						if (t._bootstrapComponents.length > 0)
							t._bootstrapComponents.forEach((t) =>
								e.bootstrap(t)
							);
						else {
							if (!t.instance.ngDoBootstrap)
								throw new Error(
									`The module ${f(
										t.instance.constructor
									)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
								);
							t.instance.ngDoBootstrap(e);
						}
						this._modules.push(t);
					}
					onDestroy(t) {
						this._destroyListeners.push(t);
					}
					get injector() {
						return this._injector;
					}
					destroy() {
						if (this._destroyed)
							throw new Error(
								'The platform has already been destroyed!'
							);
						this._modules.slice().forEach((t) => t.destroy()),
							this._destroyListeners.forEach((t) => t()),
							(this._destroyed = !0);
					}
					get destroyed() {
						return this._destroyed;
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(cn(zs));
					}),
					(t.ɵprov = S({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			function Pa(t, e) {
				return Array.isArray(e)
					? e.reduce(Pa, t)
					: Object.assign(Object.assign({}, t), e);
			}
			let Na = (() => {
				class t {
					constructor(t, e, n, r, s) {
						(this._zone = t),
							(this._injector = e),
							(this._exceptionHandler = n),
							(this._componentFactoryResolver = r),
							(this._initStatus = s),
							(this._bootstrapListeners = []),
							(this._views = []),
							(this._runningTick = !1),
							(this._stable = !0),
							(this.componentTypes = []),
							(this.components = []),
							(this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe(
								{
									next: () => {
										this._zone.run(() => {
											this.tick();
										});
									}
								}
							));
						const d = new i.a((t) => {
								(this._stable =
									this._zone.isStable &&
									!this._zone.hasPendingMacrotasks &&
									!this._zone.hasPendingMicrotasks),
									this._zone.runOutsideAngular(() => {
										t.next(this._stable), t.complete();
									});
							}),
							f = new i.a((t) => {
								let e;
								this._zone.runOutsideAngular(() => {
									e = this._zone.onStable.subscribe(() => {
										da.assertNotInAngularZone(),
											ha(() => {
												this._stable ||
													this._zone
														.hasPendingMacrotasks ||
													this._zone
														.hasPendingMicrotasks ||
													((this._stable = !0),
													t.next(!0));
											});
									});
								});
								const n = this._zone.onUnstable.subscribe(
									() => {
										da.assertInAngularZone(),
											this._stable &&
												((this._stable = !1),
												this._zone.runOutsideAngular(
													() => {
														t.next(!1);
													}
												));
									}
								);
								return () => {
									e.unsubscribe(), n.unsubscribe();
								};
							});
						this.isStable = (function (...t) {
							let e = Number.POSITIVE_INFINITY,
								n = null,
								r = t[t.length - 1];
							return (
								Object(o.a)(r)
									? ((n = t.pop()),
									  t.length > 1 &&
											'number' ==
												typeof t[t.length - 1] &&
											(e = t.pop()))
									: 'number' == typeof r && (e = t.pop()),
								null === n &&
								1 === t.length &&
								t[0] instanceof i.a
									? t[0]
									: Object(a.a)(e)(Object(l.a)(t, n))
							);
						})(
							d,
							f.pipe((t) => {
								return Object(u.a)()(
									((e = h),
									function (t) {
										let n;
										n =
											'function' == typeof e
												? e
												: function () {
														return e;
												  };
										const r = Object.create(t, c.b);
										return (
											(r.source = t),
											(r.subjectFactory = n),
											r
										);
									})(t)
								);
								var e;
							})
						);
					}
					bootstrap(t, e) {
						if (!this._initStatus.done)
							throw new Error(
								'Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.'
							);
						let n;
						(n =
							t instanceof wi
								? t
								: this._componentFactoryResolver.resolveComponentFactory(
										t
								  )),
							this.componentTypes.push(n.componentType);
						const r = n.isBoundToModule
								? void 0
								: this._injector.get(co),
							s = n.create(zs.NULL, [], e || n.selector, r),
							i = s.location.nativeElement,
							o = s.injector.get(ba, null),
							a = o && s.injector.get(va);
						return (
							o && a && a.registerApplication(i, o),
							s.onDestroy(() => {
								this.detachView(s.hostView),
									Da(this.components, s),
									a && a.unregisterApplication(i);
							}),
							this._loadComponent(s),
							s
						);
					}
					tick() {
						if (this._runningTick)
							throw new Error(
								'ApplicationRef.tick is called recursively'
							);
						try {
							this._runningTick = !0;
							for (let t of this._views) t.detectChanges();
						} catch (t) {
							this._zone.runOutsideAngular(() =>
								this._exceptionHandler.handleError(t)
							);
						} finally {
							this._runningTick = !1;
						}
					}
					attachView(t) {
						const e = t;
						this._views.push(e), e.attachToAppRef(this);
					}
					detachView(t) {
						const e = t;
						Da(this._views, e), e.detachFromAppRef();
					}
					_loadComponent(t) {
						this.attachView(t.hostView),
							this.tick(),
							this.components.push(t),
							this._injector
								.get(Xo, [])
								.concat(this._bootstrapListeners)
								.forEach((e) => e(t));
					}
					ngOnDestroy() {
						this._views.slice().forEach((t) => t.destroy()),
							this._onMicrotaskEmptySubscription.unsubscribe();
					}
					get viewCount() {
						return this._views.length;
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(
							cn(da),
							cn(zs),
							cn(ir),
							cn(Ei),
							cn(Qo)
						);
					}),
					(t.ɵprov = S({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			function Da(t, e) {
				const n = t.indexOf(e);
				n > -1 && t.splice(n, 1);
			}
			class Fa {}
			class La {}
			const Ma = {
				factoryPathPrefix: '',
				factoryPathSuffix: '.ngfactory'
			};
			let Ua = (() => {
				class t {
					constructor(t, e) {
						(this._compiler = t), (this._config = e || Ma);
					}
					load(t) {
						return this.loadAndCompile(t);
					}
					loadAndCompile(t) {
						let [e, r] = t.split('#');
						return (
							void 0 === r && (r = 'default'),
							n('zn8P')(e)
								.then((t) => t[r])
								.then((t) => Ha(t, e, r))
								.then((t) =>
									this._compiler.compileModuleAsync(t)
								)
						);
					}
					loadFactory(t) {
						let [e, r] = t.split('#'),
							s = 'NgFactory';
						return (
							void 0 === r && ((r = 'default'), (s = '')),
							n('zn8P')(
								this._config.factoryPathPrefix +
									e +
									this._config.factoryPathSuffix
							)
								.then((t) => t[r + s])
								.then((t) => Ha(t, e, r))
						);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(cn(ca), cn(La, 8));
					}),
					(t.ɵprov = S({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			function Ha(t, e, n) {
				if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
				return t;
			}
			const $a = function (t) {
					return null;
				},
				za = Ia(null, 'core', [
					{ provide: Jo, useValue: 'unknown' },
					{ provide: Ra, deps: [zs] },
					{ provide: va, deps: [] },
					{ provide: Yo, deps: [] }
				]),
				qa = [
					{ provide: Na, useClass: Na, deps: [da, zs, ir, Ei, Qo] },
					{
						provide: So,
						deps: [da],
						useFactory: function (t) {
							let e = [];
							return (
								t.onStable.subscribe(() => {
									for (; e.length; ) e.pop()();
								}),
								function (t) {
									e.push(t);
								}
							);
						}
					},
					{ provide: Qo, useClass: Qo, deps: [[new fn(), Bo]] },
					{ provide: ca, useClass: ca, deps: [] },
					Zo,
					{
						provide: Qi,
						useFactory: function () {
							return no;
						},
						deps: []
					},
					{
						provide: Zi,
						useFactory: function () {
							return ro;
						},
						deps: []
					},
					{
						provide: ta,
						useFactory: function (t) {
							return (
								vi(
									(t =
										t ||
										('undefined' != typeof $localize &&
											$localize.locale) ||
										_i)
								),
								t
							);
						},
						deps: [[new dn(ta), new fn(), new pn()]]
					},
					{ provide: ea, useValue: 'USD' }
				];
			let Va = (() => {
				class t {
					constructor(t) {}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(cn(Na));
					}),
					(t.ɵmod = rt({ type: t })),
					(t.ɵinj = E({ providers: qa })),
					t
				);
			})();
		},
		gRHU: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return i;
			});
			var r = n('2fFW'),
				s = n('NJ4a');
			const i = {
				closed: !0,
				next(t) {},
				error(t) {
					if (r.a.useDeprecatedSynchronousErrorHandling) throw t;
					Object(s.a)(t);
				},
				complete() {}
			};
		},
		jZKg: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return i;
			});
			var r = n('HDdC'),
				s = n('quSY');
			function i(t, e) {
				return new r.a((n) => {
					const r = new s.a();
					let i = 0;
					return (
						r.add(
							e.schedule(function () {
								i !== t.length
									? (n.next(t[i++]),
									  n.closed || r.add(this.schedule()))
									: n.complete();
							})
						),
						r
					);
				});
			}
		},
		kJWO: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return r;
			});
			const r = (() =>
				('function' == typeof Symbol && Symbol.observable) ||
				'@@observable')();
		},
		lJxs: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return s;
			});
			var r = n('7o/Q');
			function s(t, e) {
				return function (n) {
					if ('function' != typeof t)
						throw new TypeError(
							'argument is not a function. Are you looking for `mapTo()`?'
						);
					return n.lift(new i(t, e));
				};
			}
			class i {
				constructor(t, e) {
					(this.project = t), (this.thisArg = e);
				}
				call(t, e) {
					return e.subscribe(new o(t, this.project, this.thisArg));
				}
			}
			class o extends r.a {
				constructor(t, e, n) {
					super(t),
						(this.project = e),
						(this.count = 0),
						(this.thisArg = n || this);
				}
				_next(t) {
					let e;
					try {
						e = this.project.call(this.thisArg, t, this.count++);
					} catch (n) {
						return void this.destination.error(n);
					}
					this.destination.next(e);
				}
			}
		},
		n6bG: function (t, e, n) {
			'use strict';
			function r(t) {
				return 'function' == typeof t;
			}
			n.d(e, 'a', function () {
				return r;
			});
		},
		ngJS: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return r;
			});
			const r = (t) => (e) => {
				for (let n = 0, r = t.length; n < r && !e.closed; n++)
					e.next(t[n]);
				e.complete();
			};
		},
		ofXK: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return v;
			}),
				n.d(e, 'b', function () {
					return j;
				}),
				n.d(e, 'c', function () {
					return l;
				}),
				n.d(e, 'd', function () {
					return S;
				}),
				n.d(e, 'e', function () {
					return h;
				}),
				n.d(e, 'f', function () {
					return E;
				}),
				n.d(e, 'g', function () {
					return _;
				}),
				n.d(e, 'h', function () {
					return w;
				}),
				n.d(e, 'i', function () {
					return c;
				}),
				n.d(e, 'j', function () {
					return P;
				}),
				n.d(e, 'k', function () {
					return a;
				}),
				n.d(e, 'l', function () {
					return R;
				}),
				n.d(e, 'm', function () {
					return i;
				}),
				n.d(e, 'n', function () {
					return I;
				}),
				n.d(e, 'o', function () {
					return o;
				});
			var r = n('fXoL');
			let s = null;
			function i() {
				return s;
			}
			function o(t) {
				s || (s = t);
			}
			class a {}
			const l = new r.r('DocumentToken');
			let c = (() => {
				class t {}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵprov = Object(r.zb)({
						factory: u,
						token: t,
						providedIn: 'platform'
					})),
					t
				);
			})();
			function u() {
				return Object(r.Ib)(d);
			}
			const h = new r.r('Location Initialized');
			let d = (() => {
				class t extends c {
					constructor(t) {
						super(), (this._doc = t), this._init();
					}
					_init() {
						(this.location = i().getLocation()),
							(this._history = i().getHistory());
					}
					getBaseHrefFromDOM() {
						return i().getBaseHref(this._doc);
					}
					onPopState(t) {
						i()
							.getGlobalEventTarget(this._doc, 'window')
							.addEventListener('popstate', t, !1);
					}
					onHashChange(t) {
						i()
							.getGlobalEventTarget(this._doc, 'window')
							.addEventListener('hashchange', t, !1);
					}
					get href() {
						return this.location.href;
					}
					get protocol() {
						return this.location.protocol;
					}
					get hostname() {
						return this.location.hostname;
					}
					get port() {
						return this.location.port;
					}
					get pathname() {
						return this.location.pathname;
					}
					get search() {
						return this.location.search;
					}
					get hash() {
						return this.location.hash;
					}
					set pathname(t) {
						this.location.pathname = t;
					}
					pushState(t, e, n) {
						f()
							? this._history.pushState(t, e, n)
							: (this.location.hash = n);
					}
					replaceState(t, e, n) {
						f()
							? this._history.replaceState(t, e, n)
							: (this.location.hash = n);
					}
					forward() {
						this._history.forward();
					}
					back() {
						this._history.back();
					}
					getState() {
						return this._history.state;
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(r.Ib(l));
					}),
					(t.ɵprov = Object(r.zb)({
						factory: p,
						token: t,
						providedIn: 'platform'
					})),
					t
				);
			})();
			function f() {
				return !!window.history.pushState;
			}
			function p() {
				return new d(Object(r.Ib)(l));
			}
			function m(t, e) {
				if (0 == t.length) return e;
				if (0 == e.length) return t;
				let n = 0;
				return (
					t.endsWith('/') && n++,
					e.startsWith('/') && n++,
					2 == n ? t + e.substring(1) : 1 == n ? t + e : t + '/' + e
				);
			}
			function g(t) {
				const e = t.match(/#|\?|$/),
					n = (e && e.index) || t.length;
				return t.slice(0, n - ('/' === t[n - 1] ? 1 : 0)) + t.slice(n);
			}
			function y(t) {
				return t && '?' !== t[0] ? '?' + t : t;
			}
			let _ = (() => {
				class t {}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵprov = Object(r.zb)({
						factory: b,
						token: t,
						providedIn: 'root'
					})),
					t
				);
			})();
			function b(t) {
				const e = Object(r.Ib)(l).location;
				return new w(Object(r.Ib)(c), (e && e.origin) || '');
			}
			const v = new r.r('appBaseHref');
			let w = (() => {
					class t extends _ {
						constructor(t, e) {
							if (
								(super(),
								(this._platformLocation = t),
								null == e &&
									(e = this._platformLocation.getBaseHrefFromDOM()),
								null == e)
							)
								throw new Error(
									'No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.'
								);
							this._baseHref = e;
						}
						onPopState(t) {
							this._platformLocation.onPopState(t),
								this._platformLocation.onHashChange(t);
						}
						getBaseHref() {
							return this._baseHref;
						}
						prepareExternalUrl(t) {
							return m(this._baseHref, t);
						}
						path(t = !1) {
							const e =
									this._platformLocation.pathname +
									y(this._platformLocation.search),
								n = this._platformLocation.hash;
							return n && t ? `${e}${n}` : e;
						}
						pushState(t, e, n, r) {
							const s = this.prepareExternalUrl(n + y(r));
							this._platformLocation.pushState(t, e, s);
						}
						replaceState(t, e, n, r) {
							const s = this.prepareExternalUrl(n + y(r));
							this._platformLocation.replaceState(t, e, s);
						}
						forward() {
							this._platformLocation.forward();
						}
						back() {
							this._platformLocation.back();
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(r.Ib(c), r.Ib(v, 8));
						}),
						(t.ɵprov = r.zb({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				S = (() => {
					class t extends _ {
						constructor(t, e) {
							super(),
								(this._platformLocation = t),
								(this._baseHref = ''),
								null != e && (this._baseHref = e);
						}
						onPopState(t) {
							this._platformLocation.onPopState(t),
								this._platformLocation.onHashChange(t);
						}
						getBaseHref() {
							return this._baseHref;
						}
						path(t = !1) {
							let e = this._platformLocation.hash;
							return (
								null == e && (e = '#'),
								e.length > 0 ? e.substring(1) : e
							);
						}
						prepareExternalUrl(t) {
							const e = m(this._baseHref, t);
							return e.length > 0 ? '#' + e : e;
						}
						pushState(t, e, n, r) {
							let s = this.prepareExternalUrl(n + y(r));
							0 == s.length &&
								(s = this._platformLocation.pathname),
								this._platformLocation.pushState(t, e, s);
						}
						replaceState(t, e, n, r) {
							let s = this.prepareExternalUrl(n + y(r));
							0 == s.length &&
								(s = this._platformLocation.pathname),
								this._platformLocation.replaceState(t, e, s);
						}
						forward() {
							this._platformLocation.forward();
						}
						back() {
							this._platformLocation.back();
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(r.Ib(c), r.Ib(v, 8));
						}),
						(t.ɵprov = r.zb({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				E = (() => {
					class t {
						constructor(t, e) {
							(this._subject = new r.n()),
								(this._urlChangeListeners = []),
								(this._platformStrategy = t);
							const n = this._platformStrategy.getBaseHref();
							(this._platformLocation = e),
								(this._baseHref = g(T(n))),
								this._platformStrategy.onPopState((t) => {
									this._subject.emit({
										url: this.path(!0),
										pop: !0,
										state: t.state,
										type: t.type
									});
								});
						}
						path(t = !1) {
							return this.normalize(
								this._platformStrategy.path(t)
							);
						}
						getState() {
							return this._platformLocation.getState();
						}
						isCurrentPathEqualTo(t, e = '') {
							return this.path() == this.normalize(t + y(e));
						}
						normalize(e) {
							return t.stripTrailingSlash(
								(function (t, e) {
									return t && e.startsWith(t)
										? e.substring(t.length)
										: e;
								})(this._baseHref, T(e))
							);
						}
						prepareExternalUrl(t) {
							return (
								t && '/' !== t[0] && (t = '/' + t),
								this._platformStrategy.prepareExternalUrl(t)
							);
						}
						go(t, e = '', n = null) {
							this._platformStrategy.pushState(n, '', t, e),
								this._notifyUrlChangeListeners(
									this.prepareExternalUrl(t + y(e)),
									n
								);
						}
						replaceState(t, e = '', n = null) {
							this._platformStrategy.replaceState(n, '', t, e),
								this._notifyUrlChangeListeners(
									this.prepareExternalUrl(t + y(e)),
									n
								);
						}
						forward() {
							this._platformStrategy.forward();
						}
						back() {
							this._platformStrategy.back();
						}
						onUrlChange(t) {
							this._urlChangeListeners.push(t),
								this._urlChangeSubscription ||
									(this._urlChangeSubscription = this.subscribe(
										(t) => {
											this._notifyUrlChangeListeners(
												t.url,
												t.state
											);
										}
									));
						}
						_notifyUrlChangeListeners(t = '', e) {
							this._urlChangeListeners.forEach((n) => n(t, e));
						}
						subscribe(t, e, n) {
							return this._subject.subscribe({
								next: t,
								error: e,
								complete: n
							});
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(r.Ib(_), r.Ib(c));
						}),
						(t.normalizeQueryParams = y),
						(t.joinWithSlash = m),
						(t.stripTrailingSlash = g),
						(t.ɵprov = Object(r.zb)({
							factory: C,
							token: t,
							providedIn: 'root'
						})),
						t
					);
				})();
			function C() {
				return new E(Object(r.Ib)(_), Object(r.Ib)(c));
			}
			function T(t) {
				return t.replace(/\/index.html$/, '');
			}
			var x = (function (t) {
				return (
					(t[(t.Zero = 0)] = 'Zero'),
					(t[(t.One = 1)] = 'One'),
					(t[(t.Two = 2)] = 'Two'),
					(t[(t.Few = 3)] = 'Few'),
					(t[(t.Many = 4)] = 'Many'),
					(t[(t.Other = 5)] = 'Other'),
					t
				);
			})({});
			const O = r.jb;
			class k {}
			let A = (() => {
				class t extends k {
					constructor(t) {
						super(), (this.locale = t);
					}
					getPluralCategory(t, e) {
						switch (O(e || this.locale)(t)) {
							case x.Zero:
								return 'zero';
							case x.One:
								return 'one';
							case x.Two:
								return 'two';
							case x.Few:
								return 'few';
							case x.Many:
								return 'many';
							default:
								return 'other';
						}
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(r.Ib(r.v));
					}),
					(t.ɵprov = r.zb({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			function I(t, e) {
				e = encodeURIComponent(e);
				for (const n of t.split(';')) {
					const t = n.indexOf('='),
						[r, s] =
							-1 == t ? [n, ''] : [n.slice(0, t), n.slice(t + 1)];
					if (r.trim() === e) return decodeURIComponent(s);
				}
				return null;
			}
			let j = (() => {
				class t {}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵmod = r.Bb({ type: t })),
					(t.ɵinj = r.Ab({
						providers: [{ provide: k, useClass: A }]
					})),
					t
				);
			})();
			const R = 'browser';
			let P = (() => {
				class t {}
				return (
					(t.ɵprov = Object(r.zb)({
						token: t,
						providedIn: 'root',
						factory: () => new N(Object(r.Ib)(l), window)
					})),
					t
				);
			})();
			class N {
				constructor(t, e) {
					(this.document = t),
						(this.window = e),
						(this.offset = () => [0, 0]);
				}
				setOffset(t) {
					this.offset = Array.isArray(t) ? () => t : t;
				}
				getScrollPosition() {
					return this.supportsScrolling()
						? [this.window.pageXOffset, this.window.pageYOffset]
						: [0, 0];
				}
				scrollToPosition(t) {
					this.supportsScrolling() &&
						this.window.scrollTo(t[0], t[1]);
				}
				scrollToAnchor(t) {
					var e;
					if (!this.supportsScrolling()) return;
					const n =
						null !== (e = this.document.getElementById(t)) &&
						void 0 !== e
							? e
							: this.document.getElementsByName(t)[0];
					void 0 !== n &&
						(this.scrollToElement(n), this.attemptFocus(n));
				}
				setHistoryScrollRestoration(t) {
					if (this.supportScrollRestoration()) {
						const e = this.window.history;
						e && e.scrollRestoration && (e.scrollRestoration = t);
					}
				}
				scrollToElement(t) {
					const e = t.getBoundingClientRect(),
						n = e.left + this.window.pageXOffset,
						r = e.top + this.window.pageYOffset,
						s = this.offset();
					this.window.scrollTo(n - s[0], r - s[1]);
				}
				attemptFocus(t) {
					return t.focus(), this.document.activeElement === t;
				}
				supportScrollRestoration() {
					try {
						if (!this.supportsScrolling()) return !1;
						const t =
							D(this.window.history) ||
							D(Object.getPrototypeOf(this.window.history));
						return !(!t || (!t.writable && !t.set));
					} catch (t) {
						return !1;
					}
				}
				supportsScrolling() {
					try {
						return (
							!!this.window &&
							!!this.window.scrollTo &&
							'pageXOffset' in this.window
						);
					} catch (t) {
						return !1;
					}
				}
			}
			function D(t) {
				return Object.getOwnPropertyDescriptor(t, 'scrollRestoration');
			}
		},
		quSY: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return a;
			});
			var r = n('DH7j'),
				s = n('XoHu'),
				i = n('n6bG');
			const o = (() => {
				function t(t) {
					return (
						Error.call(this),
						(this.message = t
							? `${
									t.length
							  } errors occurred during unsubscription:\n${t
									.map((t, e) => `${e + 1}) ${t.toString()}`)
									.join('\n  ')}`
							: ''),
						(this.name = 'UnsubscriptionError'),
						(this.errors = t),
						this
					);
				}
				return (t.prototype = Object.create(Error.prototype)), t;
			})();
			let a = (() => {
				class t {
					constructor(t) {
						(this.closed = !1),
							(this._parentOrParents = null),
							(this._subscriptions = null),
							t &&
								((this._ctorUnsubscribe = !0),
								(this._unsubscribe = t));
					}
					unsubscribe() {
						let e;
						if (this.closed) return;
						let {
							_parentOrParents: n,
							_ctorUnsubscribe: a,
							_unsubscribe: c,
							_subscriptions: u
						} = this;
						if (
							((this.closed = !0),
							(this._parentOrParents = null),
							(this._subscriptions = null),
							n instanceof t)
						)
							n.remove(this);
						else if (null !== n)
							for (let t = 0; t < n.length; ++t)
								n[t].remove(this);
						if (Object(i.a)(c)) {
							a && (this._unsubscribe = void 0);
							try {
								c.call(this);
							} catch (h) {
								e = h instanceof o ? l(h.errors) : [h];
							}
						}
						if (Object(r.a)(u)) {
							let t = -1,
								n = u.length;
							for (; ++t < n; ) {
								const n = u[t];
								if (Object(s.a)(n))
									try {
										n.unsubscribe();
									} catch (h) {
										(e = e || []),
											h instanceof o
												? (e = e.concat(l(h.errors)))
												: e.push(h);
									}
							}
						}
						if (e) throw new o(e);
					}
					add(e) {
						let n = e;
						if (!e) return t.EMPTY;
						switch (typeof e) {
							case 'function':
								n = new t(e);
							case 'object':
								if (
									n === this ||
									n.closed ||
									'function' != typeof n.unsubscribe
								)
									return n;
								if (this.closed) return n.unsubscribe(), n;
								if (!(n instanceof t)) {
									const e = n;
									(n = new t()), (n._subscriptions = [e]);
								}
								break;
							default:
								throw new Error(
									'unrecognized teardown ' +
										e +
										' added to Subscription.'
								);
						}
						let { _parentOrParents: r } = n;
						if (null === r) n._parentOrParents = this;
						else if (r instanceof t) {
							if (r === this) return n;
							n._parentOrParents = [r, this];
						} else {
							if (-1 !== r.indexOf(this)) return n;
							r.push(this);
						}
						const s = this._subscriptions;
						return (
							null === s
								? (this._subscriptions = [n])
								: s.push(n),
							n
						);
					}
					remove(t) {
						const e = this._subscriptions;
						if (e) {
							const n = e.indexOf(t);
							-1 !== n && e.splice(n, 1);
						}
					}
				}
				var e;
				return (t.EMPTY = (((e = new t()).closed = !0), e)), t;
			})();
			function l(t) {
				return t.reduce(
					(t, e) => t.concat(e instanceof o ? e.errors : e),
					[]
				);
			}
		},
		tyNb: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return Yn;
			}),
				n.d(e, 'b', function () {
					return qn;
				});
			var r = n('ofXK'),
				s = n('fXoL'),
				i = n('Cfvw'),
				o = n('z+Ro'),
				a = n('yCtX'),
				l = n('jZKg');
			function c(...t) {
				let e = t[t.length - 1];
				return Object(o.a)(e)
					? (t.pop(), Object(l.a)(t, e))
					: Object(a.a)(t);
			}
			var u = n('XNiG'),
				h = n('9ppp');
			class d extends u.a {
				constructor(t) {
					super(), (this._value = t);
				}
				get value() {
					return this.getValue();
				}
				_subscribe(t) {
					const e = super._subscribe(t);
					return e && !e.closed && t.next(this._value), e;
				}
				getValue() {
					if (this.hasError) throw this.thrownError;
					if (this.closed) throw new h.a();
					return this._value;
				}
				next(t) {
					super.next((this._value = t));
				}
			}
			var f = n('DH7j'),
				p = n('7o/Q');
			class m extends p.a {
				notifyNext(t, e, n, r, s) {
					this.destination.next(e);
				}
				notifyError(t, e) {
					this.destination.error(t);
				}
				notifyComplete(t) {
					this.destination.complete();
				}
			}
			class g extends p.a {
				constructor(t, e, n) {
					super(),
						(this.parent = t),
						(this.outerValue = e),
						(this.outerIndex = n),
						(this.index = 0);
				}
				_next(t) {
					this.parent.notifyNext(
						this.outerValue,
						t,
						this.outerIndex,
						this.index++,
						this
					);
				}
				_error(t) {
					this.parent.notifyError(t, this), this.unsubscribe();
				}
				_complete() {
					this.parent.notifyComplete(this), this.unsubscribe();
				}
			}
			var y = n('SeVD'),
				_ = n('HDdC');
			function b(t, e, n, r, s = new g(t, n, r)) {
				if (!s.closed)
					return e instanceof _.a
						? e.subscribe(s)
						: Object(y.a)(e)(s);
			}
			const v = {};
			class w {
				constructor(t) {
					this.resultSelector = t;
				}
				call(t, e) {
					return e.subscribe(new S(t, this.resultSelector));
				}
			}
			class S extends m {
				constructor(t, e) {
					super(t),
						(this.resultSelector = e),
						(this.active = 0),
						(this.values = []),
						(this.observables = []);
				}
				_next(t) {
					this.values.push(v), this.observables.push(t);
				}
				_complete() {
					const t = this.observables,
						e = t.length;
					if (0 === e) this.destination.complete();
					else {
						(this.active = e), (this.toRespond = e);
						for (let n = 0; n < e; n++)
							this.add(b(this, t[n], void 0, n));
					}
				}
				notifyComplete(t) {
					0 == (this.active -= 1) && this.destination.complete();
				}
				notifyNext(t, e, n) {
					const r = this.values,
						s = this.toRespond
							? r[n] === v
								? --this.toRespond
								: this.toRespond
							: 0;
					(r[n] = e),
						0 === s &&
							(this.resultSelector
								? this._tryResultSelector(r)
								: this.destination.next(r.slice()));
				}
				_tryResultSelector(t) {
					let e;
					try {
						e = this.resultSelector.apply(this, t);
					} catch (n) {
						return void this.destination.error(n);
					}
					this.destination.next(e);
				}
			}
			const E = (() => {
				function t() {
					return (
						Error.call(this),
						(this.message = 'no elements in sequence'),
						(this.name = 'EmptyError'),
						this
					);
				}
				return (t.prototype = Object.create(Error.prototype)), t;
			})();
			var C = n('bHdf');
			function T(...t) {
				return Object(C.a)(1)(c(...t));
			}
			const x = new _.a((t) => t.complete());
			function O(t) {
				return t
					? (function (t) {
							return new _.a((e) =>
								t.schedule(() => e.complete())
							);
					  })(t)
					: x;
			}
			function k(t) {
				return new _.a((e) => {
					let n;
					try {
						n = t();
					} catch (r) {
						return void e.error(r);
					}
					return (n ? Object(i.a)(n) : O()).subscribe(e);
				});
			}
			var A = n('EQ5u'),
				I = n('lJxs'),
				j = n('zx2A');
			function R(t, e) {
				return 'function' == typeof e
					? (n) =>
							n.pipe(
								R((n, r) =>
									Object(i.a)(t(n, r)).pipe(
										Object(I.a)((t, s) => e(n, t, r, s))
									)
								)
							)
					: (e) => e.lift(new P(t));
			}
			class P {
				constructor(t) {
					this.project = t;
				}
				call(t, e) {
					return e.subscribe(new N(t, this.project));
				}
			}
			class N extends j.b {
				constructor(t, e) {
					super(t), (this.project = e), (this.index = 0);
				}
				_next(t) {
					let e;
					const n = this.index++;
					try {
						e = this.project(t, n);
					} catch (r) {
						return void this.destination.error(r);
					}
					this._innerSub(e);
				}
				_innerSub(t) {
					const e = this.innerSubscription;
					e && e.unsubscribe();
					const n = new j.a(this),
						r = this.destination;
					r.add(n),
						(this.innerSubscription = Object(j.c)(t, n)),
						this.innerSubscription !== n &&
							r.add(this.innerSubscription);
				}
				_complete() {
					const { innerSubscription: t } = this;
					(t && !t.closed) || super._complete(), this.unsubscribe();
				}
				_unsubscribe() {
					this.innerSubscription = void 0;
				}
				notifyComplete() {
					(this.innerSubscription = void 0),
						this.isStopped && super._complete();
				}
				notifyNext(t) {
					this.destination.next(t);
				}
			}
			const D = (() => {
				function t() {
					return (
						Error.call(this),
						(this.message = 'argument out of range'),
						(this.name = 'ArgumentOutOfRangeError'),
						this
					);
				}
				return (t.prototype = Object.create(Error.prototype)), t;
			})();
			function F(t) {
				return (e) => (0 === t ? O() : e.lift(new L(t)));
			}
			class L {
				constructor(t) {
					if (((this.total = t), this.total < 0)) throw new D();
				}
				call(t, e) {
					return e.subscribe(new M(t, this.total));
				}
			}
			class M extends p.a {
				constructor(t, e) {
					super(t), (this.total = e), (this.count = 0);
				}
				_next(t) {
					const e = this.total,
						n = ++this.count;
					n <= e &&
						(this.destination.next(t),
						n === e &&
							(this.destination.complete(), this.unsubscribe()));
				}
			}
			function U(t, e) {
				let n = !1;
				return (
					arguments.length >= 2 && (n = !0),
					function (r) {
						return r.lift(new H(t, e, n));
					}
				);
			}
			class H {
				constructor(t, e, n = !1) {
					(this.accumulator = t), (this.seed = e), (this.hasSeed = n);
				}
				call(t, e) {
					return e.subscribe(
						new $(t, this.accumulator, this.seed, this.hasSeed)
					);
				}
			}
			class $ extends p.a {
				constructor(t, e, n, r) {
					super(t),
						(this.accumulator = e),
						(this._seed = n),
						(this.hasSeed = r),
						(this.index = 0);
				}
				get seed() {
					return this._seed;
				}
				set seed(t) {
					(this.hasSeed = !0), (this._seed = t);
				}
				_next(t) {
					if (this.hasSeed) return this._tryNext(t);
					(this.seed = t), this.destination.next(t);
				}
				_tryNext(t) {
					const e = this.index++;
					let n;
					try {
						n = this.accumulator(this.seed, t, e);
					} catch (r) {
						this.destination.error(r);
					}
					(this.seed = n), this.destination.next(n);
				}
			}
			function z(t, e) {
				return function (n) {
					return n.lift(new q(t, e));
				};
			}
			class q {
				constructor(t, e) {
					(this.predicate = t), (this.thisArg = e);
				}
				call(t, e) {
					return e.subscribe(new V(t, this.predicate, this.thisArg));
				}
			}
			class V extends p.a {
				constructor(t, e, n) {
					super(t),
						(this.predicate = e),
						(this.thisArg = n),
						(this.count = 0);
				}
				_next(t) {
					let e;
					try {
						e = this.predicate.call(this.thisArg, t, this.count++);
					} catch (n) {
						return void this.destination.error(n);
					}
					e && this.destination.next(t);
				}
			}
			function B(t) {
				return function (e) {
					const n = new Q(t),
						r = e.lift(n);
					return (n.caught = r);
				};
			}
			class Q {
				constructor(t) {
					this.selector = t;
				}
				call(t, e) {
					return e.subscribe(new W(t, this.selector, this.caught));
				}
			}
			class W extends j.b {
				constructor(t, e, n) {
					super(t), (this.selector = e), (this.caught = n);
				}
				error(t) {
					if (!this.isStopped) {
						let n;
						try {
							n = this.selector(t, this.caught);
						} catch (e) {
							return void super.error(e);
						}
						this._unsubscribeAndRecycle();
						const r = new j.a(this);
						this.add(r);
						const s = Object(j.c)(n, r);
						s !== r && this.add(s);
					}
				}
			}
			var Z = n('5+tZ');
			function G(t, e) {
				return Object(Z.a)(t, e, 1);
			}
			function K(t) {
				return function (e) {
					return 0 === t ? O() : e.lift(new J(t));
				};
			}
			class J {
				constructor(t) {
					if (((this.total = t), this.total < 0)) throw new D();
				}
				call(t, e) {
					return e.subscribe(new X(t, this.total));
				}
			}
			class X extends p.a {
				constructor(t, e) {
					super(t),
						(this.total = e),
						(this.ring = new Array()),
						(this.count = 0);
				}
				_next(t) {
					const e = this.ring,
						n = this.total,
						r = this.count++;
					e.length < n ? e.push(t) : (e[r % n] = t);
				}
				_complete() {
					const t = this.destination;
					let e = this.count;
					if (e > 0) {
						const n =
								this.count >= this.total
									? this.total
									: this.count,
							r = this.ring;
						for (let s = 0; s < n; s++) {
							const s = e++ % n;
							t.next(r[s]);
						}
					}
					t.complete();
				}
			}
			function Y(t = nt) {
				return (e) => e.lift(new tt(t));
			}
			class tt {
				constructor(t) {
					this.errorFactory = t;
				}
				call(t, e) {
					return e.subscribe(new et(t, this.errorFactory));
				}
			}
			class et extends p.a {
				constructor(t, e) {
					super(t), (this.errorFactory = e), (this.hasValue = !1);
				}
				_next(t) {
					(this.hasValue = !0), this.destination.next(t);
				}
				_complete() {
					if (this.hasValue) return this.destination.complete();
					{
						let e;
						try {
							e = this.errorFactory();
						} catch (t) {
							e = t;
						}
						this.destination.error(e);
					}
				}
			}
			function nt() {
				return new E();
			}
			function rt(t = null) {
				return (e) => e.lift(new st(t));
			}
			class st {
				constructor(t) {
					this.defaultValue = t;
				}
				call(t, e) {
					return e.subscribe(new it(t, this.defaultValue));
				}
			}
			class it extends p.a {
				constructor(t, e) {
					super(t), (this.defaultValue = e), (this.isEmpty = !0);
				}
				_next(t) {
					(this.isEmpty = !1), this.destination.next(t);
				}
				_complete() {
					this.isEmpty && this.destination.next(this.defaultValue),
						this.destination.complete();
				}
			}
			var ot = n('SpAZ');
			function at(t, e) {
				const n = arguments.length >= 2;
				return (r) =>
					r.pipe(
						t ? z((e, n) => t(e, n, r)) : ot.a,
						F(1),
						n ? rt(e) : Y(() => new E())
					);
			}
			function lt() {}
			var ct = n('n6bG');
			function ut(t, e, n) {
				return function (r) {
					return r.lift(new ht(t, e, n));
				};
			}
			class ht {
				constructor(t, e, n) {
					(this.nextOrObserver = t),
						(this.error = e),
						(this.complete = n);
				}
				call(t, e) {
					return e.subscribe(
						new dt(
							t,
							this.nextOrObserver,
							this.error,
							this.complete
						)
					);
				}
			}
			class dt extends p.a {
				constructor(t, e, n, r) {
					super(t),
						(this._tapNext = lt),
						(this._tapError = lt),
						(this._tapComplete = lt),
						(this._tapError = n || lt),
						(this._tapComplete = r || lt),
						Object(ct.a)(e)
							? ((this._context = this), (this._tapNext = e))
							: e &&
							  ((this._context = e),
							  (this._tapNext = e.next || lt),
							  (this._tapError = e.error || lt),
							  (this._tapComplete = e.complete || lt));
				}
				_next(t) {
					try {
						this._tapNext.call(this._context, t);
					} catch (e) {
						return void this.destination.error(e);
					}
					this.destination.next(t);
				}
				_error(t) {
					try {
						this._tapError.call(this._context, t);
					} catch (t) {
						return void this.destination.error(t);
					}
					this.destination.error(t);
				}
				_complete() {
					try {
						this._tapComplete.call(this._context);
					} catch (t) {
						return void this.destination.error(t);
					}
					return this.destination.complete();
				}
			}
			var ft = n('x+ZX'),
				pt = n('quSY');
			class mt {
				constructor(t) {
					this.callback = t;
				}
				call(t, e) {
					return e.subscribe(new gt(t, this.callback));
				}
			}
			class gt extends p.a {
				constructor(t, e) {
					super(t), this.add(new pt.a(e));
				}
			}
			class yt {
				constructor(t, e) {
					(this.id = t), (this.url = e);
				}
			}
			class _t extends yt {
				constructor(t, e, n = 'imperative', r = null) {
					super(t, e),
						(this.navigationTrigger = n),
						(this.restoredState = r);
				}
				toString() {
					return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
				}
			}
			class bt extends yt {
				constructor(t, e, n) {
					super(t, e), (this.urlAfterRedirects = n);
				}
				toString() {
					return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
				}
			}
			class vt extends yt {
				constructor(t, e, n) {
					super(t, e), (this.reason = n);
				}
				toString() {
					return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
				}
			}
			class wt extends yt {
				constructor(t, e, n) {
					super(t, e), (this.error = n);
				}
				toString() {
					return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
				}
			}
			class St extends yt {
				constructor(t, e, n, r) {
					super(t, e), (this.urlAfterRedirects = n), (this.state = r);
				}
				toString() {
					return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class Et extends yt {
				constructor(t, e, n, r) {
					super(t, e), (this.urlAfterRedirects = n), (this.state = r);
				}
				toString() {
					return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class Ct extends yt {
				constructor(t, e, n, r, s) {
					super(t, e),
						(this.urlAfterRedirects = n),
						(this.state = r),
						(this.shouldActivate = s);
				}
				toString() {
					return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
				}
			}
			class Tt extends yt {
				constructor(t, e, n, r) {
					super(t, e), (this.urlAfterRedirects = n), (this.state = r);
				}
				toString() {
					return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class xt extends yt {
				constructor(t, e, n, r) {
					super(t, e), (this.urlAfterRedirects = n), (this.state = r);
				}
				toString() {
					return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class Ot {
				constructor(t) {
					this.route = t;
				}
				toString() {
					return `RouteConfigLoadStart(path: ${this.route.path})`;
				}
			}
			class kt {
				constructor(t) {
					this.route = t;
				}
				toString() {
					return `RouteConfigLoadEnd(path: ${this.route.path})`;
				}
			}
			class At {
				constructor(t) {
					this.snapshot = t;
				}
				toString() {
					return `ChildActivationStart(path: '${
						(this.snapshot.routeConfig &&
							this.snapshot.routeConfig.path) ||
						''
					}')`;
				}
			}
			class It {
				constructor(t) {
					this.snapshot = t;
				}
				toString() {
					return `ChildActivationEnd(path: '${
						(this.snapshot.routeConfig &&
							this.snapshot.routeConfig.path) ||
						''
					}')`;
				}
			}
			class jt {
				constructor(t) {
					this.snapshot = t;
				}
				toString() {
					return `ActivationStart(path: '${
						(this.snapshot.routeConfig &&
							this.snapshot.routeConfig.path) ||
						''
					}')`;
				}
			}
			class Rt {
				constructor(t) {
					this.snapshot = t;
				}
				toString() {
					return `ActivationEnd(path: '${
						(this.snapshot.routeConfig &&
							this.snapshot.routeConfig.path) ||
						''
					}')`;
				}
			}
			class Pt {
				constructor(t, e, n) {
					(this.routerEvent = t),
						(this.position = e),
						(this.anchor = n);
				}
				toString() {
					return `Scroll(anchor: '${this.anchor}', position: '${
						this.position
							? `${this.position[0]}, ${this.position[1]}`
							: null
					}')`;
				}
			}
			const Nt = 'primary';
			class Dt {
				constructor(t) {
					this.params = t || {};
				}
				has(t) {
					return Object.prototype.hasOwnProperty.call(this.params, t);
				}
				get(t) {
					if (this.has(t)) {
						const e = this.params[t];
						return Array.isArray(e) ? e[0] : e;
					}
					return null;
				}
				getAll(t) {
					if (this.has(t)) {
						const e = this.params[t];
						return Array.isArray(e) ? e : [e];
					}
					return [];
				}
				get keys() {
					return Object.keys(this.params);
				}
			}
			function Ft(t) {
				return new Dt(t);
			}
			function Lt(t) {
				const e = Error('NavigationCancelingError: ' + t);
				return (e.ngNavigationCancelingError = !0), e;
			}
			function Mt(t, e, n) {
				const r = n.path.split('/');
				if (r.length > t.length) return null;
				if (
					'full' === n.pathMatch &&
					(e.hasChildren() || r.length < t.length)
				)
					return null;
				const s = {};
				for (let i = 0; i < r.length; i++) {
					const e = r[i],
						n = t[i];
					if (e.startsWith(':')) s[e.substring(1)] = n;
					else if (e !== n.path) return null;
				}
				return { consumed: t.slice(0, r.length), posParams: s };
			}
			function Ut(t, e) {
				const n = t ? Object.keys(t) : void 0,
					r = e ? Object.keys(e) : void 0;
				if (!n || !r || n.length != r.length) return !1;
				let s;
				for (let i = 0; i < n.length; i++)
					if (((s = n[i]), !Ht(t[s], e[s]))) return !1;
				return !0;
			}
			function Ht(t, e) {
				if (Array.isArray(t) && Array.isArray(e)) {
					if (t.length !== e.length) return !1;
					const n = [...t].sort(),
						r = [...e].sort();
					return n.every((t, e) => r[e] === t);
				}
				return t === e;
			}
			function $t(t) {
				return Array.prototype.concat.apply([], t);
			}
			function zt(t) {
				return t.length > 0 ? t[t.length - 1] : null;
			}
			function qt(t, e) {
				for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
			}
			function Vt(t) {
				return Object(s.nb)(t)
					? t
					: Object(s.ob)(t)
					? Object(i.a)(Promise.resolve(t))
					: c(t);
			}
			function Bt(t, e, n) {
				return n
					? (function (t, e) {
							return Ut(t, e);
					  })(t.queryParams, e.queryParams) && Qt(t.root, e.root)
					: (function (t, e) {
							return (
								Object.keys(e).length <=
									Object.keys(t).length &&
								Object.keys(e).every((n) => Ht(t[n], e[n]))
							);
					  })(t.queryParams, e.queryParams) && Wt(t.root, e.root);
			}
			function Qt(t, e) {
				if (!Xt(t.segments, e.segments)) return !1;
				if (t.numberOfChildren !== e.numberOfChildren) return !1;
				for (const n in e.children) {
					if (!t.children[n]) return !1;
					if (!Qt(t.children[n], e.children[n])) return !1;
				}
				return !0;
			}
			function Wt(t, e) {
				return Zt(t, e, e.segments);
			}
			function Zt(t, e, n) {
				if (t.segments.length > n.length)
					return (
						!!Xt(t.segments.slice(0, n.length), n) &&
						!e.hasChildren()
					);
				if (t.segments.length === n.length) {
					if (!Xt(t.segments, n)) return !1;
					for (const n in e.children) {
						if (!t.children[n]) return !1;
						if (!Wt(t.children[n], e.children[n])) return !1;
					}
					return !0;
				}
				{
					const r = n.slice(0, t.segments.length),
						s = n.slice(t.segments.length);
					return (
						!!Xt(t.segments, r) &&
						!!t.children.primary &&
						Zt(t.children.primary, e, s)
					);
				}
			}
			class Gt {
				constructor(t, e, n) {
					(this.root = t),
						(this.queryParams = e),
						(this.fragment = n);
				}
				get queryParamMap() {
					return (
						this._queryParamMap ||
							(this._queryParamMap = Ft(this.queryParams)),
						this._queryParamMap
					);
				}
				toString() {
					return ee.serialize(this);
				}
			}
			class Kt {
				constructor(t, e) {
					(this.segments = t),
						(this.children = e),
						(this.parent = null),
						qt(e, (t, e) => (t.parent = this));
				}
				hasChildren() {
					return this.numberOfChildren > 0;
				}
				get numberOfChildren() {
					return Object.keys(this.children).length;
				}
				toString() {
					return ne(this);
				}
			}
			class Jt {
				constructor(t, e) {
					(this.path = t), (this.parameters = e);
				}
				get parameterMap() {
					return (
						this._parameterMap ||
							(this._parameterMap = Ft(this.parameters)),
						this._parameterMap
					);
				}
				toString() {
					return ce(this);
				}
			}
			function Xt(t, e) {
				return (
					t.length === e.length &&
					t.every((t, n) => t.path === e[n].path)
				);
			}
			class Yt {}
			class te {
				parse(t) {
					const e = new pe(t);
					return new Gt(
						e.parseRootSegment(),
						e.parseQueryParams(),
						e.parseFragment()
					);
				}
				serialize(t) {
					var e;
					return `/${re(t.root, !0)}${(function (t) {
						const e = Object.keys(t).map((e) => {
							const n = t[e];
							return Array.isArray(n)
								? n.map((t) => `${ie(e)}=${ie(t)}`).join('&')
								: `${ie(e)}=${ie(n)}`;
						});
						return e.length ? `?${e.join('&')}` : '';
					})(t.queryParams)}${
						'string' == typeof t.fragment
							? `#${((e = t.fragment), encodeURI(e))}`
							: ''
					}`;
				}
			}
			const ee = new te();
			function ne(t) {
				return t.segments.map((t) => ce(t)).join('/');
			}
			function re(t, e) {
				if (!t.hasChildren()) return ne(t);
				if (e) {
					const e = t.children.primary
							? re(t.children.primary, !1)
							: '',
						n = [];
					return (
						qt(t.children, (t, e) => {
							e !== Nt && n.push(`${e}:${re(t, !1)}`);
						}),
						n.length > 0 ? `${e}(${n.join('//')})` : e
					);
				}
				{
					const e = (function (t, e) {
						let n = [];
						return (
							qt(t.children, (t, r) => {
								r === Nt && (n = n.concat(e(t, r)));
							}),
							qt(t.children, (t, r) => {
								r !== Nt && (n = n.concat(e(t, r)));
							}),
							n
						);
					})(t, (e, n) =>
						n === Nt
							? [re(t.children.primary, !1)]
							: [`${n}:${re(e, !1)}`]
					);
					return 1 === Object.keys(t.children).length &&
						null != t.children.primary
						? `${ne(t)}/${e[0]}`
						: `${ne(t)}/(${e.join('//')})`;
				}
			}
			function se(t) {
				return encodeURIComponent(t)
					.replace(/%40/g, '@')
					.replace(/%3A/gi, ':')
					.replace(/%24/g, '$')
					.replace(/%2C/gi, ',');
			}
			function ie(t) {
				return se(t).replace(/%3B/gi, ';');
			}
			function oe(t) {
				return se(t)
					.replace(/\(/g, '%28')
					.replace(/\)/g, '%29')
					.replace(/%26/gi, '&');
			}
			function ae(t) {
				return decodeURIComponent(t);
			}
			function le(t) {
				return ae(t.replace(/\+/g, '%20'));
			}
			function ce(t) {
				return `${oe(t.path)}${
					((e = t.parameters),
					Object.keys(e)
						.map((t) => `;${oe(t)}=${oe(e[t])}`)
						.join(''))
				}`;
				var e;
			}
			const ue = /^[^\/()?;=#]+/;
			function he(t) {
				const e = t.match(ue);
				return e ? e[0] : '';
			}
			const de = /^[^=?&#]+/,
				fe = /^[^?&#]+/;
			class pe {
				constructor(t) {
					(this.url = t), (this.remaining = t);
				}
				parseRootSegment() {
					return (
						this.consumeOptional('/'),
						'' === this.remaining ||
						this.peekStartsWith('?') ||
						this.peekStartsWith('#')
							? new Kt([], {})
							: new Kt([], this.parseChildren())
					);
				}
				parseQueryParams() {
					const t = {};
					if (this.consumeOptional('?'))
						do {
							this.parseQueryParam(t);
						} while (this.consumeOptional('&'));
					return t;
				}
				parseFragment() {
					return this.consumeOptional('#')
						? decodeURIComponent(this.remaining)
						: null;
				}
				parseChildren() {
					if ('' === this.remaining) return {};
					this.consumeOptional('/');
					const t = [];
					for (
						this.peekStartsWith('(') || t.push(this.parseSegment());
						this.peekStartsWith('/') &&
						!this.peekStartsWith('//') &&
						!this.peekStartsWith('/(');

					)
						this.capture('/'), t.push(this.parseSegment());
					let e = {};
					this.peekStartsWith('/(') &&
						(this.capture('/'), (e = this.parseParens(!0)));
					let n = {};
					return (
						this.peekStartsWith('(') && (n = this.parseParens(!1)),
						(t.length > 0 || Object.keys(e).length > 0) &&
							(n.primary = new Kt(t, e)),
						n
					);
				}
				parseSegment() {
					const t = he(this.remaining);
					if ('' === t && this.peekStartsWith(';'))
						throw new Error(
							`Empty path url segment cannot have parameters: '${this.remaining}'.`
						);
					return (
						this.capture(t), new Jt(ae(t), this.parseMatrixParams())
					);
				}
				parseMatrixParams() {
					const t = {};
					for (; this.consumeOptional(';'); ) this.parseParam(t);
					return t;
				}
				parseParam(t) {
					const e = he(this.remaining);
					if (!e) return;
					this.capture(e);
					let n = '';
					if (this.consumeOptional('=')) {
						const t = he(this.remaining);
						t && ((n = t), this.capture(n));
					}
					t[ae(e)] = ae(n);
				}
				parseQueryParam(t) {
					const e = (function (t) {
						const e = t.match(de);
						return e ? e[0] : '';
					})(this.remaining);
					if (!e) return;
					this.capture(e);
					let n = '';
					if (this.consumeOptional('=')) {
						const t = (function (t) {
							const e = t.match(fe);
							return e ? e[0] : '';
						})(this.remaining);
						t && ((n = t), this.capture(n));
					}
					const r = le(e),
						s = le(n);
					if (t.hasOwnProperty(r)) {
						let e = t[r];
						Array.isArray(e) || ((e = [e]), (t[r] = e)), e.push(s);
					} else t[r] = s;
				}
				parseParens(t) {
					const e = {};
					for (
						this.capture('(');
						!this.consumeOptional(')') && this.remaining.length > 0;

					) {
						const n = he(this.remaining),
							r = this.remaining[n.length];
						if ('/' !== r && ')' !== r && ';' !== r)
							throw new Error(`Cannot parse url '${this.url}'`);
						let s;
						n.indexOf(':') > -1
							? ((s = n.substr(0, n.indexOf(':'))),
							  this.capture(s),
							  this.capture(':'))
							: t && (s = Nt);
						const i = this.parseChildren();
						(e[s] =
							1 === Object.keys(i).length
								? i.primary
								: new Kt([], i)),
							this.consumeOptional('//');
					}
					return e;
				}
				peekStartsWith(t) {
					return this.remaining.startsWith(t);
				}
				consumeOptional(t) {
					return (
						!!this.peekStartsWith(t) &&
						((this.remaining = this.remaining.substring(t.length)),
						!0)
					);
				}
				capture(t) {
					if (!this.consumeOptional(t))
						throw new Error(`Expected "${t}".`);
				}
			}
			class me {
				constructor(t) {
					this._root = t;
				}
				get root() {
					return this._root.value;
				}
				parent(t) {
					const e = this.pathFromRoot(t);
					return e.length > 1 ? e[e.length - 2] : null;
				}
				children(t) {
					const e = ge(t, this._root);
					return e ? e.children.map((t) => t.value) : [];
				}
				firstChild(t) {
					const e = ge(t, this._root);
					return e && e.children.length > 0
						? e.children[0].value
						: null;
				}
				siblings(t) {
					const e = ye(t, this._root);
					return e.length < 2
						? []
						: e[e.length - 2].children
								.map((t) => t.value)
								.filter((e) => e !== t);
				}
				pathFromRoot(t) {
					return ye(t, this._root).map((t) => t.value);
				}
			}
			function ge(t, e) {
				if (t === e.value) return e;
				for (const n of e.children) {
					const e = ge(t, n);
					if (e) return e;
				}
				return null;
			}
			function ye(t, e) {
				if (t === e.value) return [e];
				for (const n of e.children) {
					const r = ye(t, n);
					if (r.length) return r.unshift(e), r;
				}
				return [];
			}
			class _e {
				constructor(t, e) {
					(this.value = t), (this.children = e);
				}
				toString() {
					return `TreeNode(${this.value})`;
				}
			}
			function be(t) {
				const e = {};
				return (
					t && t.children.forEach((t) => (e[t.value.outlet] = t)), e
				);
			}
			class ve extends me {
				constructor(t, e) {
					super(t), (this.snapshot = e), xe(this, t);
				}
				toString() {
					return this.snapshot.toString();
				}
			}
			function we(t, e) {
				const n = (function (t, e) {
						const n = new Ce(
							[],
							{},
							{},
							'',
							{},
							Nt,
							e,
							null,
							t.root,
							-1,
							{}
						);
						return new Te('', new _e(n, []));
					})(t, e),
					r = new d([new Jt('', {})]),
					s = new d({}),
					i = new d({}),
					o = new d({}),
					a = new d(''),
					l = new Se(r, s, o, a, i, Nt, e, n.root);
				return (l.snapshot = n.root), new ve(new _e(l, []), n);
			}
			class Se {
				constructor(t, e, n, r, s, i, o, a) {
					(this.url = t),
						(this.params = e),
						(this.queryParams = n),
						(this.fragment = r),
						(this.data = s),
						(this.outlet = i),
						(this.component = o),
						(this._futureSnapshot = a);
				}
				get routeConfig() {
					return this._futureSnapshot.routeConfig;
				}
				get root() {
					return this._routerState.root;
				}
				get parent() {
					return this._routerState.parent(this);
				}
				get firstChild() {
					return this._routerState.firstChild(this);
				}
				get children() {
					return this._routerState.children(this);
				}
				get pathFromRoot() {
					return this._routerState.pathFromRoot(this);
				}
				get paramMap() {
					return (
						this._paramMap ||
							(this._paramMap = this.params.pipe(
								Object(I.a)((t) => Ft(t))
							)),
						this._paramMap
					);
				}
				get queryParamMap() {
					return (
						this._queryParamMap ||
							(this._queryParamMap = this.queryParams.pipe(
								Object(I.a)((t) => Ft(t))
							)),
						this._queryParamMap
					);
				}
				toString() {
					return this.snapshot
						? this.snapshot.toString()
						: `Future(${this._futureSnapshot})`;
				}
			}
			function Ee(t, e = 'emptyOnly') {
				const n = t.pathFromRoot;
				let r = 0;
				if ('always' !== e)
					for (r = n.length - 1; r >= 1; ) {
						const t = n[r],
							e = n[r - 1];
						if (t.routeConfig && '' === t.routeConfig.path) r--;
						else {
							if (e.component) break;
							r--;
						}
					}
				return (function (t) {
					return t.reduce(
						(t, e) => ({
							params: Object.assign(
								Object.assign({}, t.params),
								e.params
							),
							data: Object.assign(
								Object.assign({}, t.data),
								e.data
							),
							resolve: Object.assign(
								Object.assign({}, t.resolve),
								e._resolvedData
							)
						}),
						{ params: {}, data: {}, resolve: {} }
					);
				})(n.slice(r));
			}
			class Ce {
				constructor(t, e, n, r, s, i, o, a, l, c, u) {
					(this.url = t),
						(this.params = e),
						(this.queryParams = n),
						(this.fragment = r),
						(this.data = s),
						(this.outlet = i),
						(this.component = o),
						(this.routeConfig = a),
						(this._urlSegment = l),
						(this._lastPathIndex = c),
						(this._resolve = u);
				}
				get root() {
					return this._routerState.root;
				}
				get parent() {
					return this._routerState.parent(this);
				}
				get firstChild() {
					return this._routerState.firstChild(this);
				}
				get children() {
					return this._routerState.children(this);
				}
				get pathFromRoot() {
					return this._routerState.pathFromRoot(this);
				}
				get paramMap() {
					return (
						this._paramMap || (this._paramMap = Ft(this.params)),
						this._paramMap
					);
				}
				get queryParamMap() {
					return (
						this._queryParamMap ||
							(this._queryParamMap = Ft(this.queryParams)),
						this._queryParamMap
					);
				}
				toString() {
					return `Route(url:'${this.url
						.map((t) => t.toString())
						.join('/')}', path:'${
						this.routeConfig ? this.routeConfig.path : ''
					}')`;
				}
			}
			class Te extends me {
				constructor(t, e) {
					super(e), (this.url = t), xe(this, e);
				}
				toString() {
					return Oe(this._root);
				}
			}
			function xe(t, e) {
				(e.value._routerState = t), e.children.forEach((e) => xe(t, e));
			}
			function Oe(t) {
				const e =
					t.children.length > 0
						? ` { ${t.children.map(Oe).join(', ')} } `
						: '';
				return `${t.value}${e}`;
			}
			function ke(t) {
				if (t.snapshot) {
					const e = t.snapshot,
						n = t._futureSnapshot;
					(t.snapshot = n),
						Ut(e.queryParams, n.queryParams) ||
							t.queryParams.next(n.queryParams),
						e.fragment !== n.fragment &&
							t.fragment.next(n.fragment),
						Ut(e.params, n.params) || t.params.next(n.params),
						(function (t, e) {
							if (t.length !== e.length) return !1;
							for (let n = 0; n < t.length; ++n)
								if (!Ut(t[n], e[n])) return !1;
							return !0;
						})(e.url, n.url) || t.url.next(n.url),
						Ut(e.data, n.data) || t.data.next(n.data);
				} else
					(t.snapshot = t._futureSnapshot),
						t.data.next(t._futureSnapshot.data);
			}
			function Ae(t, e) {
				var n, r;
				return (
					Ut(t.params, e.params) &&
					Xt((n = t.url), (r = e.url)) &&
					n.every((t, e) => Ut(t.parameters, r[e].parameters)) &&
					!(!t.parent != !e.parent) &&
					(!t.parent || Ae(t.parent, e.parent))
				);
			}
			function Ie(t, e, n) {
				if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
					const r = n.value;
					r._futureSnapshot = e.value;
					const s = (function (t, e, n) {
						return e.children.map((e) => {
							for (const r of n.children)
								if (
									t.shouldReuseRoute(
										e.value,
										r.value.snapshot
									)
								)
									return Ie(t, e, r);
							return Ie(t, e);
						});
					})(t, e, n);
					return new _e(r, s);
				}
				{
					const n = t.retrieve(e.value);
					if (n) {
						const t = n.route;
						return je(e, t), t;
					}
					{
						const n = new Se(
								new d((r = e.value).url),
								new d(r.params),
								new d(r.queryParams),
								new d(r.fragment),
								new d(r.data),
								r.outlet,
								r.component,
								r
							),
							s = e.children.map((e) => Ie(t, e));
						return new _e(n, s);
					}
				}
				var r;
			}
			function je(t, e) {
				if (t.value.routeConfig !== e.value.routeConfig)
					throw new Error(
						'Cannot reattach ActivatedRouteSnapshot created from a different route'
					);
				if (t.children.length !== e.children.length)
					throw new Error(
						'Cannot reattach ActivatedRouteSnapshot with a different number of children'
					);
				e.value._futureSnapshot = t.value;
				for (let n = 0; n < t.children.length; ++n)
					je(t.children[n], e.children[n]);
			}
			function Re(t) {
				return (
					'object' == typeof t &&
					null != t &&
					!t.outlets &&
					!t.segmentPath
				);
			}
			function Pe(t) {
				return 'object' == typeof t && null != t && t.outlets;
			}
			function Ne(t, e, n, r, s) {
				let i = {};
				return (
					r &&
						qt(r, (t, e) => {
							i[e] = Array.isArray(t)
								? t.map((t) => `${t}`)
								: `${t}`;
						}),
					new Gt(n.root === t ? e : De(n.root, t, e), i, s)
				);
			}
			function De(t, e, n) {
				const r = {};
				return (
					qt(t.children, (t, s) => {
						r[s] = t === e ? n : De(t, e, n);
					}),
					new Kt(t.segments, r)
				);
			}
			class Fe {
				constructor(t, e, n) {
					if (
						((this.isAbsolute = t),
						(this.numberOfDoubleDots = e),
						(this.commands = n),
						t && n.length > 0 && Re(n[0]))
					)
						throw new Error(
							'Root segment cannot have matrix parameters'
						);
					const r = n.find(Pe);
					if (r && r !== zt(n))
						throw new Error(
							'{outlets:{}} has to be the last command'
						);
				}
				toRoot() {
					return (
						this.isAbsolute &&
						1 === this.commands.length &&
						'/' == this.commands[0]
					);
				}
			}
			class Le {
				constructor(t, e, n) {
					(this.segmentGroup = t),
						(this.processChildren = e),
						(this.index = n);
				}
			}
			function Me(t, e, n) {
				if (
					(t || (t = new Kt([], {})),
					0 === t.segments.length && t.hasChildren())
				)
					return Ue(t, e, n);
				const r = (function (t, e, n) {
						let r = 0,
							s = e;
						const i = { match: !1, pathIndex: 0, commandIndex: 0 };
						for (; s < t.segments.length; ) {
							if (r >= n.length) return i;
							const e = t.segments[s],
								o = n[r];
							if (Pe(o)) break;
							const a = `${o}`,
								l = r < n.length - 1 ? n[r + 1] : null;
							if (s > 0 && void 0 === a) break;
							if (
								a &&
								l &&
								'object' == typeof l &&
								void 0 === l.outlets
							) {
								if (!qe(a, l, e)) return i;
								r += 2;
							} else {
								if (!qe(a, {}, e)) return i;
								r++;
							}
							s++;
						}
						return { match: !0, pathIndex: s, commandIndex: r };
					})(t, e, n),
					s = n.slice(r.commandIndex);
				if (r.match && r.pathIndex < t.segments.length) {
					const e = new Kt(t.segments.slice(0, r.pathIndex), {});
					return (
						(e.children.primary = new Kt(
							t.segments.slice(r.pathIndex),
							t.children
						)),
						Ue(e, 0, s)
					);
				}
				return r.match && 0 === s.length
					? new Kt(t.segments, {})
					: r.match && !t.hasChildren()
					? He(t, e, n)
					: r.match
					? Ue(t, 0, s)
					: He(t, e, n);
			}
			function Ue(t, e, n) {
				if (0 === n.length) return new Kt(t.segments, {});
				{
					const r = (function (t) {
							return Pe(t[0]) ? t[0].outlets : { [Nt]: t };
						})(n),
						s = {};
					return (
						qt(r, (n, r) => {
							'string' == typeof n && (n = [n]),
								null !== n && (s[r] = Me(t.children[r], e, n));
						}),
						qt(t.children, (t, e) => {
							void 0 === r[e] && (s[e] = t);
						}),
						new Kt(t.segments, s)
					);
				}
			}
			function He(t, e, n) {
				const r = t.segments.slice(0, e);
				let s = 0;
				for (; s < n.length; ) {
					const i = n[s];
					if (Pe(i)) {
						const t = $e(i.outlets);
						return new Kt(r, t);
					}
					if (0 === s && Re(n[0])) {
						r.push(new Jt(t.segments[e].path, ze(n[0]))), s++;
						continue;
					}
					const o = Pe(i) ? i.outlets.primary : `${i}`,
						a = s < n.length - 1 ? n[s + 1] : null;
					o && a && Re(a)
						? (r.push(new Jt(o, ze(a))), (s += 2))
						: (r.push(new Jt(o, {})), s++);
				}
				return new Kt(r, {});
			}
			function $e(t) {
				const e = {};
				return (
					qt(t, (t, n) => {
						'string' == typeof t && (t = [t]),
							null !== t && (e[n] = He(new Kt([], {}), 0, t));
					}),
					e
				);
			}
			function ze(t) {
				const e = {};
				return qt(t, (t, n) => (e[n] = `${t}`)), e;
			}
			function qe(t, e, n) {
				return t == n.path && Ut(e, n.parameters);
			}
			class Ve {
				constructor(t, e, n, r) {
					(this.routeReuseStrategy = t),
						(this.futureState = e),
						(this.currState = n),
						(this.forwardEvent = r);
				}
				activate(t) {
					const e = this.futureState._root,
						n = this.currState ? this.currState._root : null;
					this.deactivateChildRoutes(e, n, t),
						ke(this.futureState.root),
						this.activateChildRoutes(e, n, t);
				}
				deactivateChildRoutes(t, e, n) {
					const r = be(e);
					t.children.forEach((t) => {
						const e = t.value.outlet;
						this.deactivateRoutes(t, r[e], n), delete r[e];
					}),
						qt(r, (t, e) => {
							this.deactivateRouteAndItsChildren(t, n);
						});
				}
				deactivateRoutes(t, e, n) {
					const r = t.value,
						s = e ? e.value : null;
					if (r === s)
						if (r.component) {
							const s = n.getContext(r.outlet);
							s && this.deactivateChildRoutes(t, e, s.children);
						} else this.deactivateChildRoutes(t, e, n);
					else s && this.deactivateRouteAndItsChildren(e, n);
				}
				deactivateRouteAndItsChildren(t, e) {
					this.routeReuseStrategy.shouldDetach(t.value.snapshot)
						? this.detachAndStoreRouteSubtree(t, e)
						: this.deactivateRouteAndOutlet(t, e);
				}
				detachAndStoreRouteSubtree(t, e) {
					const n = e.getContext(t.value.outlet);
					if (n && n.outlet) {
						const e = n.outlet.detach(),
							r = n.children.onOutletDeactivated();
						this.routeReuseStrategy.store(t.value.snapshot, {
							componentRef: e,
							route: t,
							contexts: r
						});
					}
				}
				deactivateRouteAndOutlet(t, e) {
					const n = e.getContext(t.value.outlet),
						r = n && t.value.component ? n.children : e,
						s = be(t);
					for (const i of Object.keys(s))
						this.deactivateRouteAndItsChildren(s[i], r);
					n &&
						n.outlet &&
						(n.outlet.deactivate(),
						n.children.onOutletDeactivated());
				}
				activateChildRoutes(t, e, n) {
					const r = be(e);
					t.children.forEach((t) => {
						this.activateRoutes(t, r[t.value.outlet], n),
							this.forwardEvent(new Rt(t.value.snapshot));
					}),
						t.children.length &&
							this.forwardEvent(new It(t.value.snapshot));
				}
				activateRoutes(t, e, n) {
					const r = t.value,
						s = e ? e.value : null;
					if ((ke(r), r === s))
						if (r.component) {
							const s = n.getOrCreateContext(r.outlet);
							this.activateChildRoutes(t, e, s.children);
						} else this.activateChildRoutes(t, e, n);
					else if (r.component) {
						const e = n.getOrCreateContext(r.outlet);
						if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
							const t = this.routeReuseStrategy.retrieve(
								r.snapshot
							);
							this.routeReuseStrategy.store(r.snapshot, null),
								e.children.onOutletReAttached(t.contexts),
								(e.attachRef = t.componentRef),
								(e.route = t.route.value),
								e.outlet &&
									e.outlet.attach(
										t.componentRef,
										t.route.value
									),
								Be(t.route);
						} else {
							const n = (function (t) {
									for (let e = t.parent; e; e = e.parent) {
										const t = e.routeConfig;
										if (t && t._loadedConfig)
											return t._loadedConfig;
										if (t && t.component) return null;
									}
									return null;
								})(r.snapshot),
								s = n
									? n.module.componentFactoryResolver
									: null;
							(e.attachRef = null),
								(e.route = r),
								(e.resolver = s),
								e.outlet && e.outlet.activateWith(r, s),
								this.activateChildRoutes(t, null, e.children);
						}
					} else this.activateChildRoutes(t, null, n);
				}
			}
			function Be(t) {
				ke(t.value), t.children.forEach(Be);
			}
			class Qe {
				constructor(t, e) {
					(this.routes = t), (this.module = e);
				}
			}
			function We(t) {
				return 'function' == typeof t;
			}
			function Ze(t) {
				return t instanceof Gt;
			}
			const Ge = Symbol('INITIAL_VALUE');
			function Ke() {
				return R((t) =>
					(function (...t) {
						let e, n;
						return (
							Object(o.a)(t[t.length - 1]) && (n = t.pop()),
							'function' == typeof t[t.length - 1] &&
								(e = t.pop()),
							1 === t.length && Object(f.a)(t[0]) && (t = t[0]),
							Object(a.a)(t, n).lift(new w(e))
						);
					})(
						t.map((t) =>
							t.pipe(
								F(1),
								(function (...t) {
									const e = t[t.length - 1];
									return Object(o.a)(e)
										? (t.pop(), (n) => T(t, n, e))
										: (e) => T(t, e);
								})(Ge)
							)
						)
					).pipe(
						U((t, e) => {
							let n = !1;
							return e.reduce((t, r, s) => {
								if (t !== Ge) return t;
								if ((r === Ge && (n = !0), !n)) {
									if (!1 === r) return r;
									if (s === e.length - 1 || Ze(r)) return r;
								}
								return t;
							}, t);
						}, Ge),
						z((t) => t !== Ge),
						Object(I.a)((t) => (Ze(t) ? t : !0 === t)),
						F(1)
					)
				);
			}
			let Je = (() => {
				class t {}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵcmp = s.xb({
						type: t,
						selectors: [['ng-component']],
						decls: 1,
						vars: 0,
						template: function (t, e) {
							1 & t && s.Eb(0, 'router-outlet');
						},
						directives: function () {
							return [qn];
						},
						encapsulation: 2
					})),
					t
				);
			})();
			function Xe(t, e = '') {
				for (let n = 0; n < t.length; n++) {
					const r = t[n];
					Ye(r, tn(e, r));
				}
			}
			function Ye(t, e) {
				t.children && Xe(t.children, e);
			}
			function tn(t, e) {
				return e
					? t || e.path
						? t && !e.path
							? `${t}/`
							: !t && e.path
							? e.path
							: `${t}/${e.path}`
						: ''
					: t;
			}
			function en(t) {
				const e = t.children && t.children.map(en),
					n = e
						? Object.assign(Object.assign({}, t), { children: e })
						: Object.assign({}, t);
				return (
					!n.component &&
						(e || n.loadChildren) &&
						n.outlet &&
						n.outlet !== Nt &&
						(n.component = Je),
					n
				);
			}
			function nn(t) {
				return t.outlet || Nt;
			}
			function rn(t, e) {
				const n = t.filter((t) => nn(t) === e);
				return n.push(...t.filter((t) => nn(t) !== e)), n;
			}
			const sn = {
				matched: !1,
				consumedSegments: [],
				lastChild: 0,
				parameters: {},
				positionalParamSegments: {}
			};
			function on(t, e, n) {
				var r;
				if ('' === e.path)
					return 'full' === e.pathMatch &&
						(t.hasChildren() || n.length > 0)
						? Object.assign({}, sn)
						: {
								matched: !0,
								consumedSegments: [],
								lastChild: 0,
								parameters: {},
								positionalParamSegments: {}
						  };
				const s = (e.matcher || Mt)(n, t, e);
				if (!s) return Object.assign({}, sn);
				const i = {};
				qt(s.posParams, (t, e) => {
					i[e] = t.path;
				});
				const o =
					s.consumed.length > 0
						? Object.assign(
								Object.assign({}, i),
								s.consumed[s.consumed.length - 1].parameters
						  )
						: i;
				return {
					matched: !0,
					consumedSegments: s.consumed,
					lastChild: s.consumed.length,
					parameters: o,
					positionalParamSegments:
						null !== (r = s.posParams) && void 0 !== r ? r : {}
				};
			}
			function an(t, e, n, r, s = 'corrected') {
				if (
					n.length > 0 &&
					(function (t, e, n) {
						return n.some((n) => ln(t, e, n) && nn(n) !== Nt);
					})(t, n, r)
				) {
					const s = new Kt(
						e,
						(function (t, e, n, r) {
							const s = {};
							(s.primary = r),
								(r._sourceSegment = t),
								(r._segmentIndexShift = e.length);
							for (const i of n)
								if ('' === i.path && nn(i) !== Nt) {
									const n = new Kt([], {});
									(n._sourceSegment = t),
										(n._segmentIndexShift = e.length),
										(s[nn(i)] = n);
								}
							return s;
						})(t, e, r, new Kt(n, t.children))
					);
					return (
						(s._sourceSegment = t),
						(s._segmentIndexShift = e.length),
						{ segmentGroup: s, slicedSegments: [] }
					);
				}
				if (
					0 === n.length &&
					(function (t, e, n) {
						return n.some((n) => ln(t, e, n));
					})(t, n, r)
				) {
					const i = new Kt(
						t.segments,
						(function (t, e, n, r, s, i) {
							const o = {};
							for (const a of r)
								if (ln(t, n, a) && !s[nn(a)]) {
									const n = new Kt([], {});
									(n._sourceSegment = t),
										(n._segmentIndexShift =
											'legacy' === i
												? t.segments.length
												: e.length),
										(o[nn(a)] = n);
								}
							return Object.assign(Object.assign({}, s), o);
						})(t, e, n, r, t.children, s)
					);
					return (
						(i._sourceSegment = t),
						(i._segmentIndexShift = e.length),
						{ segmentGroup: i, slicedSegments: n }
					);
				}
				const i = new Kt(t.segments, t.children);
				return (
					(i._sourceSegment = t),
					(i._segmentIndexShift = e.length),
					{ segmentGroup: i, slicedSegments: n }
				);
			}
			function ln(t, e, n) {
				return (
					(!(t.hasChildren() || e.length > 0) ||
						'full' !== n.pathMatch) &&
					'' === n.path
				);
			}
			function cn(t, e, n, r) {
				return (
					!!(nn(t) === r || (r !== Nt && ln(e, n, t))) &&
					('**' === t.path || on(e, t, n).matched)
				);
			}
			function un(t, e, n) {
				return 0 === e.length && !t.children[n];
			}
			class hn {
				constructor(t) {
					this.segmentGroup = t || null;
				}
			}
			class dn {
				constructor(t) {
					this.urlTree = t;
				}
			}
			function fn(t) {
				return new _.a((e) => e.error(new hn(t)));
			}
			function pn(t) {
				return new _.a((e) => e.error(new dn(t)));
			}
			function mn(t) {
				return new _.a((e) =>
					e.error(
						new Error(
							`Only absolute redirects can have named outlets. redirectTo: '${t}'`
						)
					)
				);
			}
			class gn {
				constructor(t, e, n, r, i) {
					(this.configLoader = e),
						(this.urlSerializer = n),
						(this.urlTree = r),
						(this.config = i),
						(this.allowRedirects = !0),
						(this.ngModule = t.get(s.y));
				}
				apply() {
					const t = an(this.urlTree.root, [], [], this.config)
							.segmentGroup,
						e = new Kt(t.segments, t.children);
					return this.expandSegmentGroup(
						this.ngModule,
						this.config,
						e,
						Nt
					)
						.pipe(
							Object(I.a)((t) =>
								this.createUrlTree(
									yn(t),
									this.urlTree.queryParams,
									this.urlTree.fragment
								)
							)
						)
						.pipe(
							B((t) => {
								if (t instanceof dn)
									return (
										(this.allowRedirects = !1),
										this.match(t.urlTree)
									);
								if (t instanceof hn) throw this.noMatchError(t);
								throw t;
							})
						);
				}
				match(t) {
					return this.expandSegmentGroup(
						this.ngModule,
						this.config,
						t.root,
						Nt
					)
						.pipe(
							Object(I.a)((e) =>
								this.createUrlTree(
									yn(e),
									t.queryParams,
									t.fragment
								)
							)
						)
						.pipe(
							B((t) => {
								if (t instanceof hn) throw this.noMatchError(t);
								throw t;
							})
						);
				}
				noMatchError(t) {
					return new Error(
						`Cannot match any routes. URL Segment: '${t.segmentGroup}'`
					);
				}
				createUrlTree(t, e, n) {
					const r =
						t.segments.length > 0 ? new Kt([], { [Nt]: t }) : t;
					return new Gt(r, e, n);
				}
				expandSegmentGroup(t, e, n, r) {
					return 0 === n.segments.length && n.hasChildren()
						? this.expandChildren(t, e, n).pipe(
								Object(I.a)((t) => new Kt([], t))
						  )
						: this.expandSegment(t, n, e, n.segments, r, !0);
				}
				expandChildren(t, e, n) {
					const r = [];
					for (const s of Object.keys(n.children))
						'primary' === s ? r.unshift(s) : r.push(s);
					return Object(i.a)(r).pipe(
						G((r) => {
							const s = n.children[r],
								i = rn(e, r);
							return this.expandSegmentGroup(t, i, s, r).pipe(
								Object(I.a)((t) => ({ segment: t, outlet: r }))
							);
						}),
						U((t, e) => ((t[e.outlet] = e.segment), t), {}),
						(function (t, e) {
							const n = arguments.length >= 2;
							return (r) =>
								r.pipe(
									t ? z((e, n) => t(e, n, r)) : ot.a,
									K(1),
									n ? rt(e) : Y(() => new E())
								);
						})()
					);
				}
				expandSegment(t, e, n, r, s, o) {
					return Object(i.a)(n).pipe(
						G((i) =>
							this.expandSegmentAgainstRoute(
								t,
								e,
								n,
								i,
								r,
								s,
								o
							).pipe(
								B((t) => {
									if (t instanceof hn) return c(null);
									throw t;
								})
							)
						),
						at((t) => !!t),
						B((t, n) => {
							if (t instanceof E || 'EmptyError' === t.name) {
								if (un(e, r, s)) return c(new Kt([], {}));
								throw new hn(e);
							}
							throw t;
						})
					);
				}
				expandSegmentAgainstRoute(t, e, n, r, s, i, o) {
					return cn(r, e, s, i)
						? void 0 === r.redirectTo
							? this.matchSegmentAgainstRoute(t, e, r, s, i)
							: o && this.allowRedirects
							? this.expandSegmentAgainstRouteUsingRedirect(
									t,
									e,
									n,
									r,
									s,
									i
							  )
							: fn(e)
						: fn(e);
				}
				expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
					return '**' === r.path
						? this.expandWildCardWithParamsAgainstRouteUsingRedirect(
								t,
								n,
								r,
								i
						  )
						: this.expandRegularSegmentAgainstRouteUsingRedirect(
								t,
								e,
								n,
								r,
								s,
								i
						  );
				}
				expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
					const s = this.applyRedirectCommands([], n.redirectTo, {});
					return n.redirectTo.startsWith('/')
						? pn(s)
						: this.lineralizeSegments(n, s).pipe(
								Object(Z.a)((n) => {
									const s = new Kt(n, {});
									return this.expandSegment(
										t,
										s,
										e,
										n,
										r,
										!1
									);
								})
						  );
				}
				expandRegularSegmentAgainstRouteUsingRedirect(
					t,
					e,
					n,
					r,
					s,
					i
				) {
					const {
						matched: o,
						consumedSegments: a,
						lastChild: l,
						positionalParamSegments: c
					} = on(e, r, s);
					if (!o) return fn(e);
					const u = this.applyRedirectCommands(a, r.redirectTo, c);
					return r.redirectTo.startsWith('/')
						? pn(u)
						: this.lineralizeSegments(r, u).pipe(
								Object(Z.a)((r) =>
									this.expandSegment(
										t,
										e,
										n,
										r.concat(s.slice(l)),
										i,
										!1
									)
								)
						  );
				}
				matchSegmentAgainstRoute(t, e, n, r, s) {
					if ('**' === n.path)
						return n.loadChildren
							? (n._loadedConfig
									? c(n._loadedConfig)
									: this.configLoader.load(t.injector, n)
							  ).pipe(
									Object(I.a)(
										(t) => (
											(n._loadedConfig = t), new Kt(r, {})
										)
									)
							  )
							: c(new Kt(r, {}));
					const {
						matched: i,
						consumedSegments: o,
						lastChild: a
					} = on(e, n, r);
					if (!i) return fn(e);
					const l = r.slice(a);
					return this.getChildConfig(t, n, r).pipe(
						Object(Z.a)((t) => {
							const r = t.module,
								i = t.routes,
								{ segmentGroup: a, slicedSegments: u } = an(
									e,
									o,
									l,
									i
								),
								h = new Kt(a.segments, a.children);
							if (0 === u.length && h.hasChildren())
								return this.expandChildren(r, i, h).pipe(
									Object(I.a)((t) => new Kt(o, t))
								);
							if (0 === i.length && 0 === u.length)
								return c(new Kt(o, {}));
							const d = nn(n) === s;
							return this.expandSegment(
								r,
								h,
								i,
								u,
								d ? Nt : s,
								!0
							).pipe(
								Object(I.a)(
									(t) =>
										new Kt(o.concat(t.segments), t.children)
								)
							);
						})
					);
				}
				getChildConfig(t, e, n) {
					return e.children
						? c(new Qe(e.children, t))
						: e.loadChildren
						? void 0 !== e._loadedConfig
							? c(e._loadedConfig)
							: this.runCanLoadGuards(t.injector, e, n).pipe(
									Object(Z.a)((n) =>
										n
											? this.configLoader
													.load(t.injector, e)
													.pipe(
														Object(I.a)(
															(t) => (
																(e._loadedConfig = t),
																t
															)
														)
													)
											: (function (t) {
													return new _.a((e) =>
														e.error(
															Lt(
																`Cannot load children because the guard of the route "path: '${t.path}'" returned false`
															)
														)
													);
											  })(e)
									)
							  )
						: c(new Qe([], t));
				}
				runCanLoadGuards(t, e, n) {
					const r = e.canLoad;
					return r && 0 !== r.length
						? c(
								r.map((r) => {
									const s = t.get(r);
									let i;
									if (
										(function (t) {
											return t && We(t.canLoad);
										})(s)
									)
										i = s.canLoad(e, n);
									else {
										if (!We(s))
											throw new Error(
												'Invalid CanLoad guard'
											);
										i = s(e, n);
									}
									return Vt(i);
								})
						  ).pipe(
								Ke(),
								ut((t) => {
									if (!Ze(t)) return;
									const e = Lt(
										`Redirecting to "${this.urlSerializer.serialize(
											t
										)}"`
									);
									throw ((e.url = t), e);
								}),
								Object(I.a)((t) => !0 === t)
						  )
						: c(!0);
				}
				lineralizeSegments(t, e) {
					let n = [],
						r = e.root;
					for (;;) {
						if (
							((n = n.concat(r.segments)),
							0 === r.numberOfChildren)
						)
							return c(n);
						if (r.numberOfChildren > 1 || !r.children.primary)
							return mn(t.redirectTo);
						r = r.children.primary;
					}
				}
				applyRedirectCommands(t, e, n) {
					return this.applyRedirectCreatreUrlTree(
						e,
						this.urlSerializer.parse(e),
						t,
						n
					);
				}
				applyRedirectCreatreUrlTree(t, e, n, r) {
					const s = this.createSegmentGroup(t, e.root, n, r);
					return new Gt(
						s,
						this.createQueryParams(
							e.queryParams,
							this.urlTree.queryParams
						),
						e.fragment
					);
				}
				createQueryParams(t, e) {
					const n = {};
					return (
						qt(t, (t, r) => {
							if ('string' == typeof t && t.startsWith(':')) {
								const s = t.substring(1);
								n[r] = e[s];
							} else n[r] = t;
						}),
						n
					);
				}
				createSegmentGroup(t, e, n, r) {
					const s = this.createSegments(t, e.segments, n, r);
					let i = {};
					return (
						qt(e.children, (e, s) => {
							i[s] = this.createSegmentGroup(t, e, n, r);
						}),
						new Kt(s, i)
					);
				}
				createSegments(t, e, n, r) {
					return e.map((e) =>
						e.path.startsWith(':')
							? this.findPosParam(t, e, r)
							: this.findOrReturn(e, n)
					);
				}
				findPosParam(t, e, n) {
					const r = n[e.path.substring(1)];
					if (!r)
						throw new Error(
							`Cannot redirect to '${t}'. Cannot find '${e.path}'.`
						);
					return r;
				}
				findOrReturn(t, e) {
					let n = 0;
					for (const r of e) {
						if (r.path === t.path) return e.splice(n), r;
						n++;
					}
					return t;
				}
			}
			function yn(t) {
				const e = {};
				for (const n of Object.keys(t.children)) {
					const r = yn(t.children[n]);
					(r.segments.length > 0 || r.hasChildren()) && (e[n] = r);
				}
				return (function (t) {
					if (1 === t.numberOfChildren && t.children.primary) {
						const e = t.children.primary;
						return new Kt(
							t.segments.concat(e.segments),
							e.children
						);
					}
					return t;
				})(new Kt(t.segments, e));
			}
			class _n {
				constructor(t) {
					(this.path = t),
						(this.route = this.path[this.path.length - 1]);
				}
			}
			class bn {
				constructor(t, e) {
					(this.component = t), (this.route = e);
				}
			}
			function vn(t, e, n) {
				const r = t._root;
				return Sn(r, e ? e._root : null, n, [r.value]);
			}
			function wn(t, e, n) {
				const r = (function (t) {
					if (!t) return null;
					for (let e = t.parent; e; e = e.parent) {
						const t = e.routeConfig;
						if (t && t._loadedConfig) return t._loadedConfig;
					}
					return null;
				})(e);
				return (r ? r.module.injector : n).get(t);
			}
			function Sn(
				t,
				e,
				n,
				r,
				s = { canDeactivateChecks: [], canActivateChecks: [] }
			) {
				const i = be(e);
				return (
					t.children.forEach((t) => {
						!(function (
							t,
							e,
							n,
							r,
							s = {
								canDeactivateChecks: [],
								canActivateChecks: []
							}
						) {
							const i = t.value,
								o = e ? e.value : null,
								a = n ? n.getContext(t.value.outlet) : null;
							if (o && i.routeConfig === o.routeConfig) {
								const l = (function (t, e, n) {
									if ('function' == typeof n) return n(t, e);
									switch (n) {
										case 'pathParamsChange':
											return !Xt(t.url, e.url);
										case 'pathParamsOrQueryParamsChange':
											return (
												!Xt(t.url, e.url) ||
												!Ut(
													t.queryParams,
													e.queryParams
												)
											);
										case 'always':
											return !0;
										case 'paramsOrQueryParamsChange':
											return (
												!Ae(t, e) ||
												!Ut(
													t.queryParams,
													e.queryParams
												)
											);
										case 'paramsChange':
										default:
											return !Ae(t, e);
									}
								})(o, i, i.routeConfig.runGuardsAndResolvers);
								l
									? s.canActivateChecks.push(new _n(r))
									: ((i.data = o.data),
									  (i._resolvedData = o._resolvedData)),
									Sn(
										t,
										e,
										i.component
											? a
												? a.children
												: null
											: n,
										r,
										s
									),
									l &&
										a &&
										a.outlet &&
										a.outlet.isActivated &&
										s.canDeactivateChecks.push(
											new bn(a.outlet.component, o)
										);
							} else
								o && En(e, a, s),
									s.canActivateChecks.push(new _n(r)),
									Sn(
										t,
										null,
										i.component
											? a
												? a.children
												: null
											: n,
										r,
										s
									);
						})(t, i[t.value.outlet], n, r.concat([t.value]), s),
							delete i[t.value.outlet];
					}),
					qt(i, (t, e) => En(t, n.getContext(e), s)),
					s
				);
			}
			function En(t, e, n) {
				const r = be(t),
					s = t.value;
				qt(r, (t, r) => {
					En(
						t,
						s.component ? (e ? e.children.getContext(r) : null) : e,
						n
					);
				}),
					n.canDeactivateChecks.push(
						new bn(
							s.component && e && e.outlet && e.outlet.isActivated
								? e.outlet.component
								: null,
							s
						)
					);
			}
			class Cn {}
			function Tn(t) {
				return new _.a((e) => e.error(t));
			}
			class xn {
				constructor(t, e, n, r, s, i) {
					(this.rootComponentType = t),
						(this.config = e),
						(this.urlTree = n),
						(this.url = r),
						(this.paramsInheritanceStrategy = s),
						(this.relativeLinkResolution = i);
				}
				recognize() {
					const t = an(
							this.urlTree.root,
							[],
							[],
							this.config.filter((t) => void 0 === t.redirectTo),
							this.relativeLinkResolution
						).segmentGroup,
						e = this.processSegmentGroup(this.config, t, Nt);
					if (null === e) return null;
					const n = new Ce(
							[],
							Object.freeze({}),
							Object.freeze(
								Object.assign({}, this.urlTree.queryParams)
							),
							this.urlTree.fragment,
							{},
							Nt,
							this.rootComponentType,
							null,
							this.urlTree.root,
							-1,
							{}
						),
						r = new _e(n, e),
						s = new Te(this.url, r);
					return this.inheritParamsAndData(s._root), s;
				}
				inheritParamsAndData(t) {
					const e = t.value,
						n = Ee(e, this.paramsInheritanceStrategy);
					(e.params = Object.freeze(n.params)),
						(e.data = Object.freeze(n.data)),
						t.children.forEach((t) => this.inheritParamsAndData(t));
				}
				processSegmentGroup(t, e, n) {
					return 0 === e.segments.length && e.hasChildren()
						? this.processChildren(t, e)
						: this.processSegment(t, e, e.segments, n);
				}
				processChildren(t, e) {
					const n = [];
					for (const s of Object.keys(e.children)) {
						const r = e.children[s],
							i = rn(t, s),
							o = this.processSegmentGroup(i, r, s);
						if (null === o) return null;
						n.push(...o);
					}
					const r = (function (t) {
						const e = [];
						for (const n of t) {
							if (!On(n)) {
								e.push(n);
								continue;
							}
							const t = e.find(
								(t) =>
									n.value.routeConfig === t.value.routeConfig
							);
							void 0 !== t
								? t.children.push(...n.children)
								: e.push(n);
						}
						return e;
					})(n);
					return (
						r.sort((t, e) =>
							t.value.outlet === Nt
								? -1
								: e.value.outlet === Nt
								? 1
								: t.value.outlet.localeCompare(e.value.outlet)
						),
						r
					);
				}
				processSegment(t, e, n, r) {
					for (const s of t) {
						const t = this.processSegmentAgainstRoute(s, e, n, r);
						if (null !== t) return t;
					}
					return un(e, n, r) ? [] : null;
				}
				processSegmentAgainstRoute(t, e, n, r) {
					if (t.redirectTo || !cn(t, e, n, r)) return null;
					let s,
						i = [],
						o = [];
					if ('**' === t.path) {
						const r = n.length > 0 ? zt(n).parameters : {};
						s = new Ce(
							n,
							r,
							Object.freeze(
								Object.assign({}, this.urlTree.queryParams)
							),
							this.urlTree.fragment,
							In(t),
							nn(t),
							t.component,
							t,
							kn(e),
							An(e) + n.length,
							jn(t)
						);
					} else {
						const r = on(e, t, n);
						if (!r.matched) return null;
						(i = r.consumedSegments),
							(o = n.slice(r.lastChild)),
							(s = new Ce(
								i,
								r.parameters,
								Object.freeze(
									Object.assign({}, this.urlTree.queryParams)
								),
								this.urlTree.fragment,
								In(t),
								nn(t),
								t.component,
								t,
								kn(e),
								An(e) + i.length,
								jn(t)
							));
					}
					const a = (function (t) {
							return t.children
								? t.children
								: t.loadChildren
								? t._loadedConfig.routes
								: [];
						})(t),
						{ segmentGroup: l, slicedSegments: c } = an(
							e,
							i,
							o,
							a.filter((t) => void 0 === t.redirectTo),
							this.relativeLinkResolution
						);
					if (0 === c.length && l.hasChildren()) {
						const t = this.processChildren(a, l);
						return null === t ? null : [new _e(s, t)];
					}
					if (0 === a.length && 0 === c.length)
						return [new _e(s, [])];
					const u = nn(t) === r,
						h = this.processSegment(a, l, c, u ? Nt : r);
					return null === h ? null : [new _e(s, h)];
				}
			}
			function On(t) {
				const e = t.value.routeConfig;
				return e && '' === e.path && void 0 === e.redirectTo;
			}
			function kn(t) {
				let e = t;
				for (; e._sourceSegment; ) e = e._sourceSegment;
				return e;
			}
			function An(t) {
				let e = t,
					n = e._segmentIndexShift ? e._segmentIndexShift : 0;
				for (; e._sourceSegment; )
					(e = e._sourceSegment),
						(n += e._segmentIndexShift ? e._segmentIndexShift : 0);
				return n - 1;
			}
			function In(t) {
				return t.data || {};
			}
			function jn(t) {
				return t.resolve || {};
			}
			function Rn(t) {
				return R((e) => {
					const n = t(e);
					return n ? Object(i.a)(n).pipe(Object(I.a)(() => e)) : c(e);
				});
			}
			class Pn extends class {
				shouldDetach(t) {
					return !1;
				}
				store(t, e) {}
				shouldAttach(t) {
					return !1;
				}
				retrieve(t) {
					return null;
				}
				shouldReuseRoute(t, e) {
					return t.routeConfig === e.routeConfig;
				}
			} {}
			const Nn = new s.r('ROUTES');
			class Dn {
				constructor(t, e, n, r) {
					(this.loader = t),
						(this.compiler = e),
						(this.onLoadStartListener = n),
						(this.onLoadEndListener = r);
				}
				load(t, e) {
					if (e._loader$) return e._loader$;
					this.onLoadStartListener && this.onLoadStartListener(e);
					const n = this.loadModuleFactory(e.loadChildren).pipe(
						Object(I.a)((n) => {
							this.onLoadEndListener && this.onLoadEndListener(e);
							const r = n.create(t);
							return new Qe(
								$t(
									r.injector.get(
										Nn,
										void 0,
										s.q.Self | s.q.Optional
									)
								).map(en),
								r
							);
						}),
						B((t) => {
							throw ((e._loader$ = void 0), t);
						})
					);
					return (
						(e._loader$ = new A.a(n, () => new u.a()).pipe(
							Object(ft.a)()
						)),
						e._loader$
					);
				}
				loadModuleFactory(t) {
					return 'string' == typeof t
						? Object(i.a)(this.loader.load(t))
						: Vt(t()).pipe(
								Object(Z.a)((t) =>
									t instanceof s.w
										? c(t)
										: Object(i.a)(
												this.compiler.compileModuleAsync(
													t
												)
										  )
								)
						  );
				}
			}
			class Fn {
				constructor() {
					(this.outlet = null),
						(this.route = null),
						(this.resolver = null),
						(this.children = new Ln()),
						(this.attachRef = null);
				}
			}
			class Ln {
				constructor() {
					this.contexts = new Map();
				}
				onChildOutletCreated(t, e) {
					const n = this.getOrCreateContext(t);
					(n.outlet = e), this.contexts.set(t, n);
				}
				onChildOutletDestroyed(t) {
					const e = this.getContext(t);
					e && (e.outlet = null);
				}
				onOutletDeactivated() {
					const t = this.contexts;
					return (this.contexts = new Map()), t;
				}
				onOutletReAttached(t) {
					this.contexts = t;
				}
				getOrCreateContext(t) {
					let e = this.getContext(t);
					return e || ((e = new Fn()), this.contexts.set(t, e)), e;
				}
				getContext(t) {
					return this.contexts.get(t) || null;
				}
			}
			class Mn {
				shouldProcessUrl(t) {
					return !0;
				}
				extract(t) {
					return t;
				}
				merge(t, e) {
					return t;
				}
			}
			function Un(t) {
				throw t;
			}
			function Hn(t, e, n) {
				return e.parse('/');
			}
			function $n(t, e) {
				return c(null);
			}
			let zn = (() => {
					class t {
						constructor(t, e, n, r, i, o, a, l) {
							(this.rootComponentType = t),
								(this.urlSerializer = e),
								(this.rootContexts = n),
								(this.location = r),
								(this.config = l),
								(this.lastSuccessfulNavigation = null),
								(this.currentNavigation = null),
								(this.disposed = !1),
								(this.lastLocationChangeInfo = null),
								(this.navigationId = 0),
								(this.isNgZoneEnabled = !1),
								(this.events = new u.a()),
								(this.errorHandler = Un),
								(this.malformedUriErrorHandler = Hn),
								(this.navigated = !1),
								(this.lastSuccessfulId = -1),
								(this.hooks = {
									beforePreactivation: $n,
									afterPreactivation: $n
								}),
								(this.urlHandlingStrategy = new Mn()),
								(this.routeReuseStrategy = new Pn()),
								(this.onSameUrlNavigation = 'ignore'),
								(this.paramsInheritanceStrategy = 'emptyOnly'),
								(this.urlUpdateStrategy = 'deferred'),
								(this.relativeLinkResolution = 'corrected'),
								(this.ngModule = i.get(s.y)),
								(this.console = i.get(s.V));
							const c = i.get(s.A);
							(this.isNgZoneEnabled =
								c instanceof s.A && s.A.isInAngularZone()),
								this.resetConfig(l),
								(this.currentUrlTree = new Gt(
									new Kt([], {}),
									{},
									null
								)),
								(this.rawUrlTree = this.currentUrlTree),
								(this.browserUrlTree = this.currentUrlTree),
								(this.configLoader = new Dn(
									o,
									a,
									(t) => this.triggerEvent(new Ot(t)),
									(t) => this.triggerEvent(new kt(t))
								)),
								(this.routerState = we(
									this.currentUrlTree,
									this.rootComponentType
								)),
								(this.transitions = new d({
									id: 0,
									currentUrlTree: this.currentUrlTree,
									currentRawUrl: this.currentUrlTree,
									extractedUrl: this.urlHandlingStrategy.extract(
										this.currentUrlTree
									),
									urlAfterRedirects: this.urlHandlingStrategy.extract(
										this.currentUrlTree
									),
									rawUrl: this.currentUrlTree,
									extras: {},
									resolve: null,
									reject: null,
									promise: Promise.resolve(!0),
									source: 'imperative',
									restoredState: null,
									currentSnapshot: this.routerState.snapshot,
									targetSnapshot: null,
									currentRouterState: this.routerState,
									targetRouterState: null,
									guards: {
										canActivateChecks: [],
										canDeactivateChecks: []
									},
									guardsResult: null
								})),
								(this.navigations = this.setupNavigations(
									this.transitions
								)),
								this.processNavigations();
						}
						setupNavigations(t) {
							const e = this.events;
							return t.pipe(
								z((t) => 0 !== t.id),
								Object(I.a)((t) =>
									Object.assign(Object.assign({}, t), {
										extractedUrl: this.urlHandlingStrategy.extract(
											t.rawUrl
										)
									})
								),
								R((t) => {
									let n = !1,
										r = !1;
									return c(t).pipe(
										ut((t) => {
											this.currentNavigation = {
												id: t.id,
												initialUrl: t.currentRawUrl,
												extractedUrl: t.extractedUrl,
												trigger: t.source,
												extras: t.extras,
												previousNavigation: this
													.lastSuccessfulNavigation
													? Object.assign(
															Object.assign(
																{},
																this
																	.lastSuccessfulNavigation
															),
															{
																previousNavigation: null
															}
													  )
													: null
											};
										}),
										R((t) => {
											const n =
												!this.navigated ||
												t.extractedUrl.toString() !==
													this.browserUrlTree.toString();
											if (
												('reload' ===
													this.onSameUrlNavigation ||
													n) &&
												this.urlHandlingStrategy.shouldProcessUrl(
													t.rawUrl
												)
											)
												return c(t).pipe(
													R((t) => {
														const n = this.transitions.getValue();
														return (
															e.next(
																new _t(
																	t.id,
																	this.serializeUrl(
																		t.extractedUrl
																	),
																	t.source,
																	t.restoredState
																)
															),
															n !==
															this.transitions.getValue()
																? x
																: Promise.resolve(
																		t
																  )
														);
													}),
													((r = this.ngModule
														.injector),
													(s = this.configLoader),
													(i = this.urlSerializer),
													(o = this.config),
													R((t) =>
														(function (
															t,
															e,
															n,
															r,
															s
														) {
															return new gn(
																t,
																e,
																n,
																r,
																s
															).apply();
														})(
															r,
															s,
															i,
															t.extractedUrl,
															o
														).pipe(
															Object(I.a)((e) =>
																Object.assign(
																	Object.assign(
																		{},
																		t
																	),
																	{
																		urlAfterRedirects: e
																	}
																)
															)
														)
													)),
													ut((t) => {
														this.currentNavigation = Object.assign(
															Object.assign(
																{},
																this
																	.currentNavigation
															),
															{
																finalUrl:
																	t.urlAfterRedirects
															}
														);
													}),
													(function (t, e, n, r, s) {
														return Object(Z.a)(
															(i) =>
																(function (
																	t,
																	e,
																	n,
																	r,
																	s = 'emptyOnly',
																	i = 'legacy'
																) {
																	try {
																		const o = new xn(
																			t,
																			e,
																			n,
																			r,
																			s,
																			i
																		).recognize();
																		return null ===
																			o
																			? Tn(
																					new Cn()
																			  )
																			: c(
																					o
																			  );
																	} catch (o) {
																		return Tn(
																			o
																		);
																	}
																})(
																	t,
																	e,
																	i.urlAfterRedirects,
																	n(
																		i.urlAfterRedirects
																	),
																	r,
																	s
																).pipe(
																	Object(
																		I.a
																	)((t) =>
																		Object.assign(
																			Object.assign(
																				{},
																				i
																			),
																			{
																				targetSnapshot: t
																			}
																		)
																	)
																)
														);
													})(
														this.rootComponentType,
														this.config,
														(t) =>
															this.serializeUrl(
																t
															),
														this
															.paramsInheritanceStrategy,
														this
															.relativeLinkResolution
													),
													ut((t) => {
														'eager' ===
															this
																.urlUpdateStrategy &&
															(t.extras
																.skipLocationChange ||
																this.setBrowserUrl(
																	t.urlAfterRedirects,
																	!!t.extras
																		.replaceUrl,
																	t.id,
																	t.extras
																		.state
																),
															(this.browserUrlTree =
																t.urlAfterRedirects));
														const n = new St(
															t.id,
															this.serializeUrl(
																t.extractedUrl
															),
															this.serializeUrl(
																t.urlAfterRedirects
															),
															t.targetSnapshot
														);
														e.next(n);
													})
												);
											var r, s, i, o;
											if (
												n &&
												this.rawUrlTree &&
												this.urlHandlingStrategy.shouldProcessUrl(
													this.rawUrlTree
												)
											) {
												const {
														id: n,
														extractedUrl: r,
														source: s,
														restoredState: i,
														extras: o
													} = t,
													a = new _t(
														n,
														this.serializeUrl(r),
														s,
														i
													);
												e.next(a);
												const l = we(
													r,
													this.rootComponentType
												).snapshot;
												return c(
													Object.assign(
														Object.assign({}, t),
														{
															targetSnapshot: l,
															urlAfterRedirects: r,
															extras: Object.assign(
																Object.assign(
																	{},
																	o
																),
																{
																	skipLocationChange: !1,
																	replaceUrl: !1
																}
															)
														}
													)
												);
											}
											return (
												(this.rawUrlTree = t.rawUrl),
												(this.browserUrlTree =
													t.urlAfterRedirects),
												t.resolve(null),
												x
											);
										}),
										Rn((t) => {
											const {
												targetSnapshot: e,
												id: n,
												extractedUrl: r,
												rawUrl: s,
												extras: {
													skipLocationChange: i,
													replaceUrl: o
												}
											} = t;
											return this.hooks.beforePreactivation(
												e,
												{
													navigationId: n,
													appliedUrlTree: r,
													rawUrlTree: s,
													skipLocationChange: !!i,
													replaceUrl: !!o
												}
											);
										}),
										ut((t) => {
											const e = new Et(
												t.id,
												this.serializeUrl(
													t.extractedUrl
												),
												this.serializeUrl(
													t.urlAfterRedirects
												),
												t.targetSnapshot
											);
											this.triggerEvent(e);
										}),
										Object(I.a)((t) =>
											Object.assign(
												Object.assign({}, t),
												{
													guards: vn(
														t.targetSnapshot,
														t.currentSnapshot,
														this.rootContexts
													)
												}
											)
										),
										(function (t, e) {
											return Object(Z.a)((n) => {
												const {
													targetSnapshot: r,
													currentSnapshot: s,
													guards: {
														canActivateChecks: o,
														canDeactivateChecks: a
													}
												} = n;
												return 0 === a.length &&
													0 === o.length
													? c(
															Object.assign(
																Object.assign(
																	{},
																	n
																),
																{
																	guardsResult: !0
																}
															)
													  )
													: (function (t, e, n, r) {
															return Object(i.a)(
																t
															).pipe(
																Object(Z.a)(
																	(t) =>
																		(function (
																			t,
																			e,
																			n,
																			r,
																			s
																		) {
																			const i =
																				e &&
																				e.routeConfig
																					? e
																							.routeConfig
																							.canDeactivate
																					: null;
																			return i &&
																				0 !==
																					i.length
																				? c(
																						i.map(
																							(
																								i
																							) => {
																								const o = wn(
																									i,
																									e,
																									s
																								);
																								let a;
																								if (
																									(function (
																										t
																									) {
																										return (
																											t &&
																											We(
																												t.canDeactivate
																											)
																										);
																									})(
																										o
																									)
																								)
																									a = Vt(
																										o.canDeactivate(
																											t,
																											e,
																											n,
																											r
																										)
																									);
																								else {
																									if (
																										!We(
																											o
																										)
																									)
																										throw new Error(
																											'Invalid CanDeactivate guard'
																										);
																									a = Vt(
																										o(
																											t,
																											e,
																											n,
																											r
																										)
																									);
																								}
																								return a.pipe(
																									at()
																								);
																							}
																						)
																				  ).pipe(
																						Ke()
																				  )
																				: c(
																						!0
																				  );
																		})(
																			t.component,
																			t.route,
																			n,
																			e,
																			r
																		)
																),
																at(
																	(t) =>
																		!0 !==
																		t,
																	!0
																)
															);
													  })(a, r, s, t).pipe(
															Object(Z.a)((n) =>
																n &&
																'boolean' ==
																	typeof n
																	? (function (
																			t,
																			e,
																			n,
																			r
																	  ) {
																			return Object(
																				i.a
																			)(
																				e
																			).pipe(
																				G(
																					(
																						e
																					) =>
																						T(
																							(function (
																								t,
																								e
																							) {
																								return (
																									null !==
																										t &&
																										e &&
																										e(
																											new At(
																												t
																											)
																										),
																									c(
																										!0
																									)
																								);
																							})(
																								e
																									.route
																									.parent,
																								r
																							),
																							(function (
																								t,
																								e
																							) {
																								return (
																									null !==
																										t &&
																										e &&
																										e(
																											new jt(
																												t
																											)
																										),
																									c(
																										!0
																									)
																								);
																							})(
																								e.route,
																								r
																							),
																							(function (
																								t,
																								e,
																								n
																							) {
																								const r =
																										e[
																											e.length -
																												1
																										],
																									s = e
																										.slice(
																											0,
																											e.length -
																												1
																										)
																										.reverse()
																										.map(
																											(
																												t
																											) =>
																												(function (
																													t
																												) {
																													const e = t.routeConfig
																														? t
																																.routeConfig
																																.canActivateChild
																														: null;
																													return e &&
																														0 !==
																															e.length
																														? {
																																node: t,
																																guards: e
																														  }
																														: null;
																												})(
																													t
																												)
																										)
																										.filter(
																											(
																												t
																											) =>
																												null !==
																												t
																										)
																										.map(
																											(
																												e
																											) =>
																												k(
																													() =>
																														c(
																															e.guards.map(
																																(
																																	s
																																) => {
																																	const i = wn(
																																		s,
																																		e.node,
																																		n
																																	);
																																	let o;
																																	if (
																																		(function (
																																			t
																																		) {
																																			return (
																																				t &&
																																				We(
																																					t.canActivateChild
																																				)
																																			);
																																		})(
																																			i
																																		)
																																	)
																																		o = Vt(
																																			i.canActivateChild(
																																				r,
																																				t
																																			)
																																		);
																																	else {
																																		if (
																																			!We(
																																				i
																																			)
																																		)
																																			throw new Error(
																																				'Invalid CanActivateChild guard'
																																			);
																																		o = Vt(
																																			i(
																																				r,
																																				t
																																			)
																																		);
																																	}
																																	return o.pipe(
																																		at()
																																	);
																																}
																															)
																														).pipe(
																															Ke()
																														)
																												)
																										);
																								return c(
																									s
																								).pipe(
																									Ke()
																								);
																							})(
																								t,
																								e.path,
																								n
																							),
																							(function (
																								t,
																								e,
																								n
																							) {
																								const r = e.routeConfig
																									? e
																											.routeConfig
																											.canActivate
																									: null;
																								return r &&
																									0 !==
																										r.length
																									? c(
																											r.map(
																												(
																													r
																												) =>
																													k(
																														() => {
																															const s = wn(
																																r,
																																e,
																																n
																															);
																															let i;
																															if (
																																(function (
																																	t
																																) {
																																	return (
																																		t &&
																																		We(
																																			t.canActivate
																																		)
																																	);
																																})(
																																	s
																																)
																															)
																																i = Vt(
																																	s.canActivate(
																																		e,
																																		t
																																	)
																																);
																															else {
																																if (
																																	!We(
																																		s
																																	)
																																)
																																	throw new Error(
																																		'Invalid CanActivate guard'
																																	);
																																i = Vt(
																																	s(
																																		e,
																																		t
																																	)
																																);
																															}
																															return i.pipe(
																																at()
																															);
																														}
																													)
																											)
																									  ).pipe(
																											Ke()
																									  )
																									: c(
																											!0
																									  );
																							})(
																								t,
																								e.route,
																								n
																							)
																						)
																				),
																				at(
																					(
																						t
																					) =>
																						!0 !==
																						t,
																					!0
																				)
																			);
																	  })(
																			r,
																			o,
																			t,
																			e
																	  )
																	: c(n)
															),
															Object(I.a)((t) =>
																Object.assign(
																	Object.assign(
																		{},
																		n
																	),
																	{
																		guardsResult: t
																	}
																)
															)
													  );
											});
										})(this.ngModule.injector, (t) =>
											this.triggerEvent(t)
										),
										ut((t) => {
											if (Ze(t.guardsResult)) {
												const e = Lt(
													`Redirecting to "${this.serializeUrl(
														t.guardsResult
													)}"`
												);
												throw (
													((e.url = t.guardsResult),
													e)
												);
											}
											const e = new Ct(
												t.id,
												this.serializeUrl(
													t.extractedUrl
												),
												this.serializeUrl(
													t.urlAfterRedirects
												),
												t.targetSnapshot,
												!!t.guardsResult
											);
											this.triggerEvent(e);
										}),
										z((t) => {
											if (!t.guardsResult) {
												this.resetUrlToCurrentUrlTree();
												const n = new vt(
													t.id,
													this.serializeUrl(
														t.extractedUrl
													),
													''
												);
												return (
													e.next(n), t.resolve(!1), !1
												);
											}
											return !0;
										}),
										Rn((t) => {
											if (
												t.guards.canActivateChecks
													.length
											)
												return c(t).pipe(
													ut((t) => {
														const e = new Tt(
															t.id,
															this.serializeUrl(
																t.extractedUrl
															),
															this.serializeUrl(
																t.urlAfterRedirects
															),
															t.targetSnapshot
														);
														this.triggerEvent(e);
													}),
													R((t) => {
														let n = !1;
														return c(t).pipe(
															((r = this
																.paramsInheritanceStrategy),
															(s = this.ngModule
																.injector),
															Object(Z.a)((t) => {
																const {
																	targetSnapshot: e,
																	guards: {
																		canActivateChecks: n
																	}
																} = t;
																if (!n.length)
																	return c(t);
																let o = 0;
																return Object(
																	i.a
																)(n).pipe(
																	G((t) =>
																		(function (
																			t,
																			e,
																			n,
																			r
																		) {
																			return (function (
																				t,
																				e,
																				n,
																				r
																			) {
																				const s = Object.keys(
																					t
																				);
																				if (
																					0 ===
																					s.length
																				)
																					return c(
																						{}
																					);
																				const o = {};
																				return Object(
																					i.a
																				)(
																					s
																				).pipe(
																					Object(
																						Z.a
																					)(
																						(
																							s
																						) =>
																							(function (
																								t,
																								e,
																								n,
																								r
																							) {
																								const s = wn(
																									t,
																									e,
																									r
																								);
																								return Vt(
																									s.resolve
																										? s.resolve(
																												e,
																												n
																										  )
																										: s(
																												e,
																												n
																										  )
																								);
																							})(
																								t[
																									s
																								],
																								e,
																								n,
																								r
																							).pipe(
																								ut(
																									(
																										t
																									) => {
																										o[
																											s
																										] = t;
																									}
																								)
																							)
																					),
																					K(
																						1
																					),
																					Object(
																						Z.a
																					)(
																						() =>
																							Object.keys(
																								o
																							)
																								.length ===
																							s.length
																								? c(
																										o
																								  )
																								: x
																					)
																				);
																			})(
																				t._resolve,
																				t,
																				e,
																				r
																			).pipe(
																				Object(
																					I.a
																				)(
																					(
																						e
																					) => (
																						(t._resolvedData = e),
																						(t.data = Object.assign(
																							Object.assign(
																								{},
																								t.data
																							),
																							Ee(
																								t,
																								n
																							)
																								.resolve
																						)),
																						null
																					)
																				)
																			);
																		})(
																			t.route,
																			e,
																			r,
																			s
																		)
																	),
																	ut(
																		() =>
																			o++
																	),
																	K(1),
																	Object(
																		Z.a
																	)((e) =>
																		o ===
																		n.length
																			? c(
																					t
																			  )
																			: x
																	)
																);
															})),
															ut({
																next: () =>
																	(n = !0),
																complete: () => {
																	if (!n) {
																		const n = new vt(
																			t.id,
																			this.serializeUrl(
																				t.extractedUrl
																			),
																			"At least one route resolver didn't emit any value."
																		);
																		e.next(
																			n
																		),
																			t.resolve(
																				!1
																			);
																	}
																}
															})
														);
														var r, s;
													}),
													ut((t) => {
														const e = new xt(
															t.id,
															this.serializeUrl(
																t.extractedUrl
															),
															this.serializeUrl(
																t.urlAfterRedirects
															),
															t.targetSnapshot
														);
														this.triggerEvent(e);
													})
												);
										}),
										Rn((t) => {
											const {
												targetSnapshot: e,
												id: n,
												extractedUrl: r,
												rawUrl: s,
												extras: {
													skipLocationChange: i,
													replaceUrl: o
												}
											} = t;
											return this.hooks.afterPreactivation(
												e,
												{
													navigationId: n,
													appliedUrlTree: r,
													rawUrlTree: s,
													skipLocationChange: !!i,
													replaceUrl: !!o
												}
											);
										}),
										Object(I.a)((t) => {
											const e = (function (t, e, n) {
												const r = Ie(
													t,
													e._root,
													n ? n._root : void 0
												);
												return new ve(r, e);
											})(
												this.routeReuseStrategy,
												t.targetSnapshot,
												t.currentRouterState
											);
											return Object.assign(
												Object.assign({}, t),
												{ targetRouterState: e }
											);
										}),
										ut((t) => {
											(this.currentUrlTree =
												t.urlAfterRedirects),
												(this.rawUrlTree = this.urlHandlingStrategy.merge(
													this.currentUrlTree,
													t.rawUrl
												)),
												(this.routerState =
													t.targetRouterState),
												'deferred' ===
													this.urlUpdateStrategy &&
													(t.extras
														.skipLocationChange ||
														this.setBrowserUrl(
															this.rawUrlTree,
															!!t.extras
																.replaceUrl,
															t.id,
															t.extras.state
														),
													(this.browserUrlTree =
														t.urlAfterRedirects));
										}),
										((o = this.rootContexts),
										(a = this.routeReuseStrategy),
										(l = (t) => this.triggerEvent(t)),
										Object(I.a)(
											(t) => (
												new Ve(
													a,
													t.targetRouterState,
													t.currentRouterState,
													l
												).activate(o),
												t
											)
										)),
										ut({
											next() {
												n = !0;
											},
											complete() {
												n = !0;
											}
										}),
										((s = () => {
											if (!n && !r) {
												this.resetUrlToCurrentUrlTree();
												const n = new vt(
													t.id,
													this.serializeUrl(
														t.extractedUrl
													),
													`Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
												);
												e.next(n), t.resolve(!1);
											}
											this.currentNavigation = null;
										}),
										(t) => t.lift(new mt(s))),
										B((n) => {
											if (
												((r = !0),
												(s = n) &&
													s.ngNavigationCancelingError)
											) {
												const r = Ze(n.url);
												r ||
													((this.navigated = !0),
													this.resetStateAndUrl(
														t.currentRouterState,
														t.currentUrlTree,
														t.rawUrl
													));
												const s = new vt(
													t.id,
													this.serializeUrl(
														t.extractedUrl
													),
													n.message
												);
												e.next(s),
													r
														? setTimeout(() => {
																const e = this.urlHandlingStrategy.merge(
																	n.url,
																	this
																		.rawUrlTree
																);
																this.scheduleNavigation(
																	e,
																	'imperative',
																	null,
																	{
																		skipLocationChange:
																			t
																				.extras
																				.skipLocationChange,
																		replaceUrl:
																			'eager' ===
																			this
																				.urlUpdateStrategy
																	},
																	{
																		resolve:
																			t.resolve,
																		reject:
																			t.reject,
																		promise:
																			t.promise
																	}
																);
														  }, 0)
														: t.resolve(!1);
											} else {
												this.resetStateAndUrl(
													t.currentRouterState,
													t.currentUrlTree,
													t.rawUrl
												);
												const r = new wt(
													t.id,
													this.serializeUrl(
														t.extractedUrl
													),
													n
												);
												e.next(r);
												try {
													t.resolve(
														this.errorHandler(n)
													);
												} catch (i) {
													t.reject(i);
												}
											}
											var s;
											return x;
										})
									);
									var s, o, a, l;
								})
							);
						}
						resetRootComponentType(t) {
							(this.rootComponentType = t),
								(this.routerState.root.component = this.rootComponentType);
						}
						getTransition() {
							const t = this.transitions.value;
							return (
								(t.urlAfterRedirects = this.browserUrlTree), t
							);
						}
						setTransition(t) {
							this.transitions.next(
								Object.assign(
									Object.assign({}, this.getTransition()),
									t
								)
							);
						}
						initialNavigation() {
							this.setUpLocationChangeListener(),
								0 === this.navigationId &&
									this.navigateByUrl(this.location.path(!0), {
										replaceUrl: !0
									});
						}
						setUpLocationChangeListener() {
							this.locationSubscription ||
								(this.locationSubscription = this.location.subscribe(
									(t) => {
										const e = this.extractLocationChangeInfoFromEvent(
											t
										);
										this.shouldScheduleNavigation(
											this.lastLocationChangeInfo,
											e
										) &&
											setTimeout(() => {
												const {
														source: t,
														state: n,
														urlTree: r
													} = e,
													s = { replaceUrl: !0 };
												if (n) {
													const t = Object.assign(
														{},
														n
													);
													delete t.navigationId,
														0 !==
															Object.keys(t)
																.length &&
															(s.state = t);
												}
												this.scheduleNavigation(
													r,
													t,
													n,
													s
												);
											}, 0),
											(this.lastLocationChangeInfo = e);
									}
								));
						}
						extractLocationChangeInfoFromEvent(t) {
							var e;
							return {
								source:
									'popstate' === t.type
										? 'popstate'
										: 'hashchange',
								urlTree: this.parseUrl(t.url),
								state: (
									null === (e = t.state) || void 0 === e
										? void 0
										: e.navigationId
								)
									? t.state
									: null,
								transitionId: this.getTransition().id
							};
						}
						shouldScheduleNavigation(t, e) {
							if (!t) return !0;
							const n =
								e.urlTree.toString() === t.urlTree.toString();
							return !(
								e.transitionId === t.transitionId &&
								n &&
								(('hashchange' === e.source &&
									'popstate' === t.source) ||
									('popstate' === e.source &&
										'hashchange' === t.source))
							);
						}
						get url() {
							return this.serializeUrl(this.currentUrlTree);
						}
						getCurrentNavigation() {
							return this.currentNavigation;
						}
						triggerEvent(t) {
							this.events.next(t);
						}
						resetConfig(t) {
							Xe(t),
								(this.config = t.map(en)),
								(this.navigated = !1),
								(this.lastSuccessfulId = -1);
						}
						ngOnDestroy() {
							this.dispose();
						}
						dispose() {
							this.transitions.complete(),
								this.locationSubscription &&
									(this.locationSubscription.unsubscribe(),
									(this.locationSubscription = void 0)),
								(this.disposed = !0);
						}
						createUrlTree(t, e = {}) {
							const {
									relativeTo: n,
									queryParams: r,
									fragment: s,
									queryParamsHandling: i,
									preserveFragment: o
								} = e,
								a = n || this.routerState.root,
								l = o ? this.currentUrlTree.fragment : s;
							let c = null;
							switch (i) {
								case 'merge':
									c = Object.assign(
										Object.assign(
											{},
											this.currentUrlTree.queryParams
										),
										r
									);
									break;
								case 'preserve':
									c = this.currentUrlTree.queryParams;
									break;
								default:
									c = r || null;
							}
							return (
								null !== c && (c = this.removeEmptyProps(c)),
								(function (t, e, n, r, s) {
									if (0 === n.length)
										return Ne(e.root, e.root, e, r, s);
									const i = (function (t) {
										if (
											'string' == typeof t[0] &&
											1 === t.length &&
											'/' === t[0]
										)
											return new Fe(!0, 0, t);
										let e = 0,
											n = !1;
										const r = t.reduce((t, r, s) => {
											if (
												'object' == typeof r &&
												null != r
											) {
												if (r.outlets) {
													const e = {};
													return (
														qt(
															r.outlets,
															(t, n) => {
																e[n] =
																	'string' ==
																	typeof t
																		? t.split(
																				'/'
																		  )
																		: t;
															}
														),
														[...t, { outlets: e }]
													);
												}
												if (r.segmentPath)
													return [
														...t,
														r.segmentPath
													];
											}
											return 'string' != typeof r
												? [...t, r]
												: 0 === s
												? (r
														.split('/')
														.forEach((r, s) => {
															(0 == s &&
																'.' === r) ||
																(0 == s &&
																'' === r
																	? (n = !0)
																	: '..' === r
																	? e++
																	: '' != r &&
																	  t.push(
																			r
																	  ));
														}),
												  t)
												: [...t, r];
										}, []);
										return new Fe(n, e, r);
									})(n);
									if (i.toRoot())
										return Ne(
											e.root,
											new Kt([], {}),
											e,
											r,
											s
										);
									const o = (function (t, e, n) {
											if (t.isAbsolute)
												return new Le(e.root, !0, 0);
											if (
												-1 === n.snapshot._lastPathIndex
											) {
												const t =
													n.snapshot._urlSegment;
												return new Le(
													t,
													t === e.root,
													0
												);
											}
											const r = Re(t.commands[0]) ? 0 : 1;
											return (function (t, e, n) {
												let r = t,
													s = e,
													i = n;
												for (; i > s; ) {
													if (
														((i -= s),
														(r = r.parent),
														!r)
													)
														throw new Error(
															"Invalid number of '../'"
														);
													s = r.segments.length;
												}
												return new Le(r, !1, s - i);
											})(
												n.snapshot._urlSegment,
												n.snapshot._lastPathIndex + r,
												t.numberOfDoubleDots
											);
										})(i, e, t),
										a = o.processChildren
											? Ue(
													o.segmentGroup,
													o.index,
													i.commands
											  )
											: Me(
													o.segmentGroup,
													o.index,
													i.commands
											  );
									return Ne(o.segmentGroup, a, e, r, s);
								})(a, this.currentUrlTree, t, c, l)
							);
						}
						navigateByUrl(t, e = { skipLocationChange: !1 }) {
							const n = Ze(t) ? t : this.parseUrl(t),
								r = this.urlHandlingStrategy.merge(
									n,
									this.rawUrlTree
								);
							return this.scheduleNavigation(
								r,
								'imperative',
								null,
								e
							);
						}
						navigate(t, e = { skipLocationChange: !1 }) {
							return (
								(function (t) {
									for (let e = 0; e < t.length; e++) {
										const n = t[e];
										if (null == n)
											throw new Error(
												`The requested path contains ${n} segment at index ${e}`
											);
									}
								})(t),
								this.navigateByUrl(this.createUrlTree(t, e), e)
							);
						}
						serializeUrl(t) {
							return this.urlSerializer.serialize(t);
						}
						parseUrl(t) {
							let e;
							try {
								e = this.urlSerializer.parse(t);
							} catch (n) {
								e = this.malformedUriErrorHandler(
									n,
									this.urlSerializer,
									t
								);
							}
							return e;
						}
						isActive(t, e) {
							if (Ze(t)) return Bt(this.currentUrlTree, t, e);
							const n = this.parseUrl(t);
							return Bt(this.currentUrlTree, n, e);
						}
						removeEmptyProps(t) {
							return Object.keys(t).reduce((e, n) => {
								const r = t[n];
								return null != r && (e[n] = r), e;
							}, {});
						}
						processNavigations() {
							this.navigations.subscribe(
								(t) => {
									(this.navigated = !0),
										(this.lastSuccessfulId = t.id),
										this.events.next(
											new bt(
												t.id,
												this.serializeUrl(
													t.extractedUrl
												),
												this.serializeUrl(
													this.currentUrlTree
												)
											)
										),
										(this.lastSuccessfulNavigation = this.currentNavigation),
										(this.currentNavigation = null),
										t.resolve(!0);
								},
								(t) => {
									this.console.warn(
										'Unhandled Navigation Error: '
									);
								}
							);
						}
						scheduleNavigation(t, e, n, r, s) {
							if (this.disposed) return Promise.resolve(!1);
							const i = this.getTransition(),
								o =
									'imperative' !== e &&
									'imperative' ===
										(null == i ? void 0 : i.source),
								a =
									(this.lastSuccessfulId === i.id ||
									this.currentNavigation
										? i.rawUrl
										: i.urlAfterRedirects
									).toString() === t.toString();
							if (o && a) return Promise.resolve(!0);
							let l, c, u;
							s
								? ((l = s.resolve),
								  (c = s.reject),
								  (u = s.promise))
								: (u = new Promise((t, e) => {
										(l = t), (c = e);
								  }));
							const h = ++this.navigationId;
							return (
								this.setTransition({
									id: h,
									source: e,
									restoredState: n,
									currentUrlTree: this.currentUrlTree,
									currentRawUrl: this.rawUrlTree,
									rawUrl: t,
									extras: r,
									resolve: l,
									reject: c,
									promise: u,
									currentSnapshot: this.routerState.snapshot,
									currentRouterState: this.routerState
								}),
								u.catch((t) => Promise.reject(t))
							);
						}
						setBrowserUrl(t, e, n, r) {
							const s = this.urlSerializer.serialize(t);
							(r = r || {}),
								this.location.isCurrentPathEqualTo(s) || e
									? this.location.replaceState(
											s,
											'',
											Object.assign(
												Object.assign({}, r),
												{ navigationId: n }
											)
									  )
									: this.location.go(
											s,
											'',
											Object.assign(
												Object.assign({}, r),
												{ navigationId: n }
											)
									  );
						}
						resetStateAndUrl(t, e, n) {
							(this.routerState = t),
								(this.currentUrlTree = e),
								(this.rawUrlTree = this.urlHandlingStrategy.merge(
									this.currentUrlTree,
									n
								)),
								this.resetUrlToCurrentUrlTree();
						}
						resetUrlToCurrentUrlTree() {
							this.location.replaceState(
								this.urlSerializer.serialize(this.rawUrlTree),
								'',
								{ navigationId: this.lastSuccessfulId }
							);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(
								s.Ib(s.N),
								s.Ib(Yt),
								s.Ib(Ln),
								s.Ib(r.f),
								s.Ib(s.s),
								s.Ib(s.x),
								s.Ib(s.i),
								s.Ib(void 0)
							);
						}),
						(t.ɵprov = s.zb({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				qn = (() => {
					class t {
						constructor(t, e, n, r, i) {
							(this.parentContexts = t),
								(this.location = e),
								(this.resolver = n),
								(this.changeDetector = i),
								(this.activated = null),
								(this._activatedRoute = null),
								(this.activateEvents = new s.n()),
								(this.deactivateEvents = new s.n()),
								(this.name = r || Nt),
								t.onChildOutletCreated(this.name, this);
						}
						ngOnDestroy() {
							this.parentContexts.onChildOutletDestroyed(
								this.name
							);
						}
						ngOnInit() {
							if (!this.activated) {
								const t = this.parentContexts.getContext(
									this.name
								);
								t &&
									t.route &&
									(t.attachRef
										? this.attach(t.attachRef, t.route)
										: this.activateWith(
												t.route,
												t.resolver || null
										  ));
							}
						}
						get isActivated() {
							return !!this.activated;
						}
						get component() {
							if (!this.activated)
								throw new Error('Outlet is not activated');
							return this.activated.instance;
						}
						get activatedRoute() {
							if (!this.activated)
								throw new Error('Outlet is not activated');
							return this._activatedRoute;
						}
						get activatedRouteData() {
							return this._activatedRoute
								? this._activatedRoute.snapshot.data
								: {};
						}
						detach() {
							if (!this.activated)
								throw new Error('Outlet is not activated');
							this.location.detach();
							const t = this.activated;
							return (
								(this.activated = null),
								(this._activatedRoute = null),
								t
							);
						}
						attach(t, e) {
							(this.activated = t),
								(this._activatedRoute = e),
								this.location.insert(t.hostView);
						}
						deactivate() {
							if (this.activated) {
								const t = this.component;
								this.activated.destroy(),
									(this.activated = null),
									(this._activatedRoute = null),
									this.deactivateEvents.emit(t);
							}
						}
						activateWith(t, e) {
							if (this.isActivated)
								throw new Error(
									'Cannot activate an already activated outlet'
								);
							this._activatedRoute = t;
							const n = (e =
									e || this.resolver).resolveComponentFactory(
									t._futureSnapshot.routeConfig.component
								),
								r = this.parentContexts.getOrCreateContext(
									this.name
								).children,
								s = new Vn(t, r, this.location.injector);
							(this.activated = this.location.createComponent(
								n,
								this.location.length,
								s
							)),
								this.changeDetector.markForCheck(),
								this.activateEvents.emit(
									this.activated.instance
								);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(
								s.Db(Ln),
								s.Db(s.P),
								s.Db(s.j),
								s.Jb('name'),
								s.Db(s.h)
							);
						}),
						(t.ɵdir = s.yb({
							type: t,
							selectors: [['router-outlet']],
							outputs: {
								activateEvents: 'activate',
								deactivateEvents: 'deactivate'
							},
							exportAs: ['outlet']
						})),
						t
					);
				})();
			class Vn {
				constructor(t, e, n) {
					(this.route = t),
						(this.childContexts = e),
						(this.parent = n);
				}
				get(t, e) {
					return t === Se
						? this.route
						: t === Ln
						? this.childContexts
						: this.parent.get(t, e);
				}
			}
			class Bn {}
			class Qn {
				preload(t, e) {
					return c(null);
				}
			}
			let Wn = (() => {
					class t {
						constructor(t, e, n, r, s) {
							(this.router = t),
								(this.injector = r),
								(this.preloadingStrategy = s),
								(this.loader = new Dn(
									e,
									n,
									(e) => t.triggerEvent(new Ot(e)),
									(e) => t.triggerEvent(new kt(e))
								));
						}
						setUpPreloading() {
							this.subscription = this.router.events
								.pipe(
									z((t) => t instanceof bt),
									G(() => this.preload())
								)
								.subscribe(() => {});
						}
						preload() {
							const t = this.injector.get(s.y);
							return this.processRoutes(t, this.router.config);
						}
						ngOnDestroy() {
							this.subscription &&
								this.subscription.unsubscribe();
						}
						processRoutes(t, e) {
							const n = [];
							for (const r of e)
								if (
									r.loadChildren &&
									!r.canLoad &&
									r._loadedConfig
								) {
									const t = r._loadedConfig;
									n.push(
										this.processRoutes(t.module, t.routes)
									);
								} else
									r.loadChildren && !r.canLoad
										? n.push(this.preloadConfig(t, r))
										: r.children &&
										  n.push(
												this.processRoutes(
													t,
													r.children
												)
										  );
							return Object(i.a)(n).pipe(
								Object(C.a)(),
								Object(I.a)((t) => {})
							);
						}
						preloadConfig(t, e) {
							return this.preloadingStrategy.preload(e, () =>
								(e._loadedConfig
									? c(e._loadedConfig)
									: this.loader.load(t.injector, e)
								).pipe(
									Object(Z.a)(
										(t) => (
											(e._loadedConfig = t),
											this.processRoutes(
												t.module,
												t.routes
											)
										)
									)
								)
							);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(
								s.Ib(zn),
								s.Ib(s.x),
								s.Ib(s.i),
								s.Ib(s.s),
								s.Ib(Bn)
							);
						}),
						(t.ɵprov = s.zb({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				Zn = (() => {
					class t {
						constructor(t, e, n = {}) {
							(this.router = t),
								(this.viewportScroller = e),
								(this.options = n),
								(this.lastId = 0),
								(this.lastSource = 'imperative'),
								(this.restoredId = 0),
								(this.store = {}),
								(n.scrollPositionRestoration =
									n.scrollPositionRestoration || 'disabled'),
								(n.anchorScrolling =
									n.anchorScrolling || 'disabled');
						}
						init() {
							'disabled' !==
								this.options.scrollPositionRestoration &&
								this.viewportScroller.setHistoryScrollRestoration(
									'manual'
								),
								(this.routerEventsSubscription = this.createScrollEvents()),
								(this.scrollEventsSubscription = this.consumeScrollEvents());
						}
						createScrollEvents() {
							return this.router.events.subscribe((t) => {
								t instanceof _t
									? ((this.store[
											this.lastId
									  ] = this.viewportScroller.getScrollPosition()),
									  (this.lastSource = t.navigationTrigger),
									  (this.restoredId = t.restoredState
											? t.restoredState.navigationId
											: 0))
									: t instanceof bt &&
									  ((this.lastId = t.id),
									  this.scheduleScrollEvent(
											t,
											this.router.parseUrl(
												t.urlAfterRedirects
											).fragment
									  ));
							});
						}
						consumeScrollEvents() {
							return this.router.events.subscribe((t) => {
								t instanceof Pt &&
									(t.position
										? 'top' ===
										  this.options.scrollPositionRestoration
											? this.viewportScroller.scrollToPosition(
													[0, 0]
											  )
											: 'enabled' ===
													this.options
														.scrollPositionRestoration &&
											  this.viewportScroller.scrollToPosition(
													t.position
											  )
										: t.anchor &&
										  'enabled' ===
												this.options.anchorScrolling
										? this.viewportScroller.scrollToAnchor(
												t.anchor
										  )
										: 'disabled' !==
												this.options
													.scrollPositionRestoration &&
										  this.viewportScroller.scrollToPosition(
												[0, 0]
										  ));
							});
						}
						scheduleScrollEvent(t, e) {
							this.router.triggerEvent(
								new Pt(
									t,
									'popstate' === this.lastSource
										? this.store[this.restoredId]
										: null,
									e
								)
							);
						}
						ngOnDestroy() {
							this.routerEventsSubscription &&
								this.routerEventsSubscription.unsubscribe(),
								this.scrollEventsSubscription &&
									this.scrollEventsSubscription.unsubscribe();
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(
								s.Ib(zn),
								s.Ib(r.j),
								s.Ib(void 0)
							);
						}),
						(t.ɵprov = s.zb({ token: t, factory: t.ɵfac })),
						t
					);
				})();
			const Gn = new s.r('ROUTER_CONFIGURATION'),
				Kn = new s.r('ROUTER_FORROOT_GUARD'),
				Jn = [
					r.f,
					{ provide: Yt, useClass: te },
					{
						provide: zn,
						useFactory: function (
							t,
							e,
							n,
							s,
							i,
							o,
							a,
							l = {},
							c,
							u
						) {
							const h = new zn(null, t, e, n, s, i, o, $t(a));
							if (
								(c && (h.urlHandlingStrategy = c),
								u && (h.routeReuseStrategy = u),
								(function (t, e) {
									t.errorHandler &&
										(e.errorHandler = t.errorHandler),
										t.malformedUriErrorHandler &&
											(e.malformedUriErrorHandler =
												t.malformedUriErrorHandler),
										t.onSameUrlNavigation &&
											(e.onSameUrlNavigation =
												t.onSameUrlNavigation),
										t.paramsInheritanceStrategy &&
											(e.paramsInheritanceStrategy =
												t.paramsInheritanceStrategy),
										t.relativeLinkResolution &&
											(e.relativeLinkResolution =
												t.relativeLinkResolution),
										t.urlUpdateStrategy &&
											(e.urlUpdateStrategy =
												t.urlUpdateStrategy);
								})(l, h),
								l.enableTracing)
							) {
								const t = Object(r.m)();
								h.events.subscribe((e) => {
									t.logGroup(
										`Router Event: ${e.constructor.name}`
									),
										t.log(e.toString()),
										t.log(e),
										t.logGroupEnd();
								});
							}
							return h;
						},
						deps: [
							Yt,
							Ln,
							r.f,
							s.s,
							s.x,
							s.i,
							Nn,
							Gn,
							[class {}, new s.B()],
							[class {}, new s.B()]
						]
					},
					Ln,
					{
						provide: Se,
						useFactory: function (t) {
							return t.routerState.root;
						},
						deps: [zn]
					},
					{ provide: s.x, useClass: s.K },
					Wn,
					Qn,
					class {
						preload(t, e) {
							return e().pipe(B(() => c(null)));
						}
					},
					{ provide: Gn, useValue: { enableTracing: !1 } }
				];
			function Xn() {
				return new s.z('Router', zn);
			}
			let Yn = (() => {
				class t {
					constructor(t, e) {}
					static forRoot(e, n) {
						return {
							ngModule: t,
							providers: [
								Jn,
								rr(e),
								{
									provide: Kn,
									useFactory: nr,
									deps: [[zn, new s.B(), new s.J()]]
								},
								{ provide: Gn, useValue: n || {} },
								{
									provide: r.g,
									useFactory: er,
									deps: [r.i, [new s.p(r.a), new s.B()], Gn]
								},
								{
									provide: Zn,
									useFactory: tr,
									deps: [zn, r.j, Gn]
								},
								{
									provide: Bn,
									useExisting:
										n && n.preloadingStrategy
											? n.preloadingStrategy
											: Qn
								},
								{ provide: s.z, multi: !0, useFactory: Xn },
								[
									sr,
									{
										provide: s.d,
										multi: !0,
										useFactory: ir,
										deps: [sr]
									},
									{ provide: ar, useFactory: or, deps: [sr] },
									{ provide: s.b, multi: !0, useExisting: ar }
								]
							]
						};
					}
					static forChild(e) {
						return { ngModule: t, providers: [rr(e)] };
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(s.Ib(Kn, 8), s.Ib(zn, 8));
					}),
					(t.ɵmod = s.Bb({ type: t })),
					(t.ɵinj = s.Ab({})),
					t
				);
			})();
			function tr(t, e, n) {
				return (
					n.scrollOffset && e.setOffset(n.scrollOffset),
					new Zn(t, e, n)
				);
			}
			function er(t, e, n = {}) {
				return n.useHash ? new r.d(t, e) : new r.h(t, e);
			}
			function nr(t) {
				return 'guarded';
			}
			function rr(t) {
				return [
					{ provide: s.a, multi: !0, useValue: t },
					{ provide: Nn, multi: !0, useValue: t }
				];
			}
			let sr = (() => {
				class t {
					constructor(t) {
						(this.injector = t),
							(this.initNavigation = !1),
							(this.resultOfPreactivationDone = new u.a());
					}
					appInitializer() {
						return this.injector
							.get(r.e, Promise.resolve(null))
							.then(() => {
								let t = null;
								const e = new Promise((e) => (t = e)),
									n = this.injector.get(zn),
									r = this.injector.get(Gn);
								return (
									'disabled' === r.initialNavigation
										? (n.setUpLocationChangeListener(),
										  t(!0))
										: 'enabled' === r.initialNavigation ||
										  'enabledBlocking' ===
												r.initialNavigation
										? ((n.hooks.afterPreactivation = () =>
												this.initNavigation
													? c(null)
													: ((this.initNavigation = !0),
													  t(!0),
													  this
															.resultOfPreactivationDone)),
										  n.initialNavigation())
										: t(!0),
									e
								);
							});
					}
					bootstrapListener(t) {
						const e = this.injector.get(Gn),
							n = this.injector.get(Wn),
							r = this.injector.get(Zn),
							i = this.injector.get(zn),
							o = this.injector.get(s.g);
						t === o.components[0] &&
							(('enabledNonBlocking' !== e.initialNavigation &&
								void 0 !== e.initialNavigation) ||
								i.initialNavigation(),
							n.setUpPreloading(),
							r.init(),
							i.resetRootComponentType(o.componentTypes[0]),
							this.resultOfPreactivationDone.next(null),
							this.resultOfPreactivationDone.complete());
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(s.Ib(s.s));
					}),
					(t.ɵprov = s.zb({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			function ir(t) {
				return t.appInitializer.bind(t);
			}
			function or(t) {
				return t.bootstrapListener.bind(t);
			}
			const ar = new s.r('Router Initializer');
		},
		'x+ZX': function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return s;
			});
			var r = n('7o/Q');
			function s() {
				return function (t) {
					return t.lift(new i(t));
				};
			}
			class i {
				constructor(t) {
					this.connectable = t;
				}
				call(t, e) {
					const { connectable: n } = this;
					n._refCount++;
					const r = new o(t, n),
						s = e.subscribe(r);
					return r.closed || (r.connection = n.connect()), s;
				}
			}
			class o extends r.a {
				constructor(t, e) {
					super(t), (this.connectable = e);
				}
				_unsubscribe() {
					const { connectable: t } = this;
					if (!t) return void (this.connection = null);
					this.connectable = null;
					const e = t._refCount;
					if (e <= 0) return void (this.connection = null);
					if (((t._refCount = e - 1), e > 1))
						return void (this.connection = null);
					const { connection: n } = this,
						r = t._connection;
					(this.connection = null),
						!r || (n && r !== n) || r.unsubscribe();
				}
			}
		},
		yCtX: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return o;
			});
			var r = n('HDdC'),
				s = n('ngJS'),
				i = n('jZKg');
			function o(t, e) {
				return e ? Object(i.a)(t, e) : new r.a(Object(s.a)(t));
			}
		},
		'z+Ro': function (t, e, n) {
			'use strict';
			function r(t) {
				return t && 'function' == typeof t.schedule;
			}
			n.d(e, 'a', function () {
				return r;
			});
		},
		zUnb: function (t, e, n) {
			'use strict';
			n.r(e);
			var r = n('ofXK'),
				s = n('fXoL');
			class i extends r.k {
				constructor() {
					super();
				}
				supportsDOMEvents() {
					return !0;
				}
			}
			class o extends i {
				static makeCurrent() {
					Object(r.o)(new o());
				}
				getProperty(t, e) {
					return t[e];
				}
				log(t) {
					window.console &&
						window.console.log &&
						window.console.log(t);
				}
				logGroup(t) {
					window.console &&
						window.console.group &&
						window.console.group(t);
				}
				logGroupEnd() {
					window.console &&
						window.console.groupEnd &&
						window.console.groupEnd();
				}
				onAndCancel(t, e, n) {
					return (
						t.addEventListener(e, n, !1),
						() => {
							t.removeEventListener(e, n, !1);
						}
					);
				}
				dispatchEvent(t, e) {
					t.dispatchEvent(e);
				}
				remove(t) {
					return t.parentNode && t.parentNode.removeChild(t), t;
				}
				getValue(t) {
					return t.value;
				}
				createElement(t, e) {
					return (e = e || this.getDefaultDocument()).createElement(
						t
					);
				}
				createHtmlDocument() {
					return document.implementation.createHTMLDocument(
						'fakeTitle'
					);
				}
				getDefaultDocument() {
					return document;
				}
				isElementNode(t) {
					return t.nodeType === Node.ELEMENT_NODE;
				}
				isShadowRoot(t) {
					return t instanceof DocumentFragment;
				}
				getGlobalEventTarget(t, e) {
					return 'window' === e
						? window
						: 'document' === e
						? t
						: 'body' === e
						? t.body
						: null;
				}
				getHistory() {
					return window.history;
				}
				getLocation() {
					return window.location;
				}
				getBaseHref(t) {
					const e =
						l || ((l = document.querySelector('base')), l)
							? l.getAttribute('href')
							: null;
					return null == e
						? null
						: ((n = e),
						  a || (a = document.createElement('a')),
						  a.setAttribute('href', n),
						  '/' === a.pathname.charAt(0)
								? a.pathname
								: '/' + a.pathname);
					var n;
				}
				resetBaseElement() {
					l = null;
				}
				getUserAgent() {
					return window.navigator.userAgent;
				}
				performanceNow() {
					return window.performance && window.performance.now
						? window.performance.now()
						: new Date().getTime();
				}
				supportsCookies() {
					return !0;
				}
				getCookie(t) {
					return Object(r.n)(document.cookie, t);
				}
			}
			let a,
				l = null;
			const c = new s.r('TRANSITION_ID'),
				u = [
					{
						provide: s.d,
						useFactory: function (t, e, n) {
							return () => {
								n.get(s.e).donePromise.then(() => {
									const n = Object(r.m)();
									Array.prototype.slice
										.apply(
											e.querySelectorAll(
												'style[ng-transition]'
											)
										)
										.filter(
											(e) =>
												e.getAttribute(
													'ng-transition'
												) === t
										)
										.forEach((t) => n.remove(t));
								});
							};
						},
						deps: [c, r.c, s.s],
						multi: !0
					}
				];
			class h {
				static init() {
					Object(s.U)(new h());
				}
				addToWindow(t) {
					(s.lb.getAngularTestability = (e, n = !0) => {
						const r = t.findTestabilityInTree(e, n);
						if (null == r)
							throw new Error(
								'Could not find testability for element.'
							);
						return r;
					}),
						(s.lb.getAllAngularTestabilities = () =>
							t.getAllTestabilities()),
						(s.lb.getAllAngularRootElements = () =>
							t.getAllRootElements()),
						s.lb.frameworkStabilizers ||
							(s.lb.frameworkStabilizers = []),
						s.lb.frameworkStabilizers.push((t) => {
							const e = s.lb.getAllAngularTestabilities();
							let n = e.length,
								r = !1;
							const i = function (e) {
								(r = r || e), n--, 0 == n && t(r);
							};
							e.forEach(function (t) {
								t.whenStable(i);
							});
						});
				}
				findTestabilityInTree(t, e, n) {
					if (null == e) return null;
					const s = t.getTestability(e);
					return null != s
						? s
						: n
						? Object(r.m)().isShadowRoot(e)
							? this.findTestabilityInTree(t, e.host, !0)
							: this.findTestabilityInTree(t, e.parentElement, !0)
						: null;
				}
			}
			const d = new s.r('EventManagerPlugins');
			let f = (() => {
				class t {
					constructor(t, e) {
						(this._zone = e),
							(this._eventNameToPlugin = new Map()),
							t.forEach((t) => (t.manager = this)),
							(this._plugins = t.slice().reverse());
					}
					addEventListener(t, e, n) {
						return this._findPluginFor(e).addEventListener(t, e, n);
					}
					addGlobalEventListener(t, e, n) {
						return this._findPluginFor(e).addGlobalEventListener(
							t,
							e,
							n
						);
					}
					getZone() {
						return this._zone;
					}
					_findPluginFor(t) {
						const e = this._eventNameToPlugin.get(t);
						if (e) return e;
						const n = this._plugins;
						for (let r = 0; r < n.length; r++) {
							const e = n[r];
							if (e.supports(t))
								return this._eventNameToPlugin.set(t, e), e;
						}
						throw new Error(
							`No event manager plugin found for event ${t}`
						);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(s.Ib(d), s.Ib(s.A));
					}),
					(t.ɵprov = s.zb({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			class p {
				constructor(t) {
					this._doc = t;
				}
				addGlobalEventListener(t, e, n) {
					const s = Object(r.m)().getGlobalEventTarget(this._doc, t);
					if (!s)
						throw new Error(
							`Unsupported event target ${s} for event ${e}`
						);
					return this.addEventListener(s, e, n);
				}
			}
			let m = (() => {
					class t {
						constructor() {
							this._stylesSet = new Set();
						}
						addStyles(t) {
							const e = new Set();
							t.forEach((t) => {
								this._stylesSet.has(t) ||
									(this._stylesSet.add(t), e.add(t));
							}),
								this.onStylesAdded(e);
						}
						onStylesAdded(t) {}
						getAllStyles() {
							return Array.from(this._stylesSet);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵprov = s.zb({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				g = (() => {
					class t extends m {
						constructor(t) {
							super(),
								(this._doc = t),
								(this._hostNodes = new Set()),
								(this._styleNodes = new Set()),
								this._hostNodes.add(t.head);
						}
						_addStylesToHost(t, e) {
							t.forEach((t) => {
								const n = this._doc.createElement('style');
								(n.textContent = t),
									this._styleNodes.add(e.appendChild(n));
							});
						}
						addHost(t) {
							this._addStylesToHost(this._stylesSet, t),
								this._hostNodes.add(t);
						}
						removeHost(t) {
							this._hostNodes.delete(t);
						}
						onStylesAdded(t) {
							this._hostNodes.forEach((e) =>
								this._addStylesToHost(t, e)
							);
						}
						ngOnDestroy() {
							this._styleNodes.forEach((t) =>
								Object(r.m)().remove(t)
							);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(s.Ib(r.c));
						}),
						(t.ɵprov = s.zb({ token: t, factory: t.ɵfac })),
						t
					);
				})();
			const y = {
					svg: 'http://www.w3.org/2000/svg',
					xhtml: 'http://www.w3.org/1999/xhtml',
					xlink: 'http://www.w3.org/1999/xlink',
					xml: 'http://www.w3.org/XML/1998/namespace',
					xmlns: 'http://www.w3.org/2000/xmlns/'
				},
				_ = /%COMP%/g;
			function b(t, e, n) {
				for (let r = 0; r < e.length; r++) {
					let s = e[r];
					Array.isArray(s)
						? b(t, s, n)
						: ((s = s.replace(_, t)), n.push(s));
				}
				return n;
			}
			function v(t) {
				return (e) => {
					if ('__ngUnwrap__' === e) return t;
					!1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
				};
			}
			let w = (() => {
				class t {
					constructor(t, e, n) {
						(this.eventManager = t),
							(this.sharedStylesHost = e),
							(this.appId = n),
							(this.rendererByCompId = new Map()),
							(this.defaultRenderer = new S(t));
					}
					createRenderer(t, e) {
						if (!t || !e) return this.defaultRenderer;
						switch (e.encapsulation) {
							case s.Q.Emulated: {
								let n = this.rendererByCompId.get(e.id);
								return (
									n ||
										((n = new E(
											this.eventManager,
											this.sharedStylesHost,
											e,
											this.appId
										)),
										this.rendererByCompId.set(e.id, n)),
									n.applyToHost(t),
									n
								);
							}
							case 1:
							case s.Q.ShadowDom:
								return new C(
									this.eventManager,
									this.sharedStylesHost,
									t,
									e
								);
							default:
								if (!this.rendererByCompId.has(e.id)) {
									const t = b(e.id, e.styles, []);
									this.sharedStylesHost.addStyles(t),
										this.rendererByCompId.set(
											e.id,
											this.defaultRenderer
										);
								}
								return this.defaultRenderer;
						}
					}
					begin() {}
					end() {}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(s.Ib(f), s.Ib(g), s.Ib(s.c));
					}),
					(t.ɵprov = s.zb({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			class S {
				constructor(t) {
					(this.eventManager = t), (this.data = Object.create(null));
				}
				destroy() {}
				createElement(t, e) {
					return e
						? document.createElementNS(y[e] || e, t)
						: document.createElement(t);
				}
				createComment(t) {
					return document.createComment(t);
				}
				createText(t) {
					return document.createTextNode(t);
				}
				appendChild(t, e) {
					t.appendChild(e);
				}
				insertBefore(t, e, n) {
					t && t.insertBefore(e, n);
				}
				removeChild(t, e) {
					t && t.removeChild(e);
				}
				selectRootElement(t, e) {
					let n =
						'string' == typeof t ? document.querySelector(t) : t;
					if (!n)
						throw new Error(
							`The selector "${t}" did not match any elements`
						);
					return e || (n.textContent = ''), n;
				}
				parentNode(t) {
					return t.parentNode;
				}
				nextSibling(t) {
					return t.nextSibling;
				}
				setAttribute(t, e, n, r) {
					if (r) {
						e = r + ':' + e;
						const s = y[r];
						s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
					} else t.setAttribute(e, n);
				}
				removeAttribute(t, e, n) {
					if (n) {
						const r = y[n];
						r
							? t.removeAttributeNS(r, e)
							: t.removeAttribute(`${n}:${e}`);
					} else t.removeAttribute(e);
				}
				addClass(t, e) {
					t.classList.add(e);
				}
				removeClass(t, e) {
					t.classList.remove(e);
				}
				setStyle(t, e, n, r) {
					r & (s.G.DashCase | s.G.Important)
						? t.style.setProperty(
								e,
								n,
								r & s.G.Important ? 'important' : ''
						  )
						: (t.style[e] = n);
				}
				removeStyle(t, e, n) {
					n & s.G.DashCase
						? t.style.removeProperty(e)
						: (t.style[e] = '');
				}
				setProperty(t, e, n) {
					t[e] = n;
				}
				setValue(t, e) {
					t.nodeValue = e;
				}
				listen(t, e, n) {
					return 'string' == typeof t
						? this.eventManager.addGlobalEventListener(t, e, v(n))
						: this.eventManager.addEventListener(t, e, v(n));
				}
			}
			class E extends S {
				constructor(t, e, n, r) {
					super(t), (this.component = n);
					const s = b(r + '-' + n.id, n.styles, []);
					e.addStyles(s),
						(this.contentAttr = '_ngcontent-%COMP%'.replace(
							_,
							r + '-' + n.id
						)),
						(this.hostAttr = '_nghost-%COMP%'.replace(
							_,
							r + '-' + n.id
						));
				}
				applyToHost(t) {
					super.setAttribute(t, this.hostAttr, '');
				}
				createElement(t, e) {
					const n = super.createElement(t, e);
					return super.setAttribute(n, this.contentAttr, ''), n;
				}
			}
			class C extends S {
				constructor(t, e, n, r) {
					super(t),
						(this.sharedStylesHost = e),
						(this.hostEl = n),
						(this.shadowRoot = n.attachShadow({ mode: 'open' })),
						this.sharedStylesHost.addHost(this.shadowRoot);
					const s = b(r.id, r.styles, []);
					for (let i = 0; i < s.length; i++) {
						const t = document.createElement('style');
						(t.textContent = s[i]), this.shadowRoot.appendChild(t);
					}
				}
				nodeOrShadowRoot(t) {
					return t === this.hostEl ? this.shadowRoot : t;
				}
				destroy() {
					this.sharedStylesHost.removeHost(this.shadowRoot);
				}
				appendChild(t, e) {
					return super.appendChild(this.nodeOrShadowRoot(t), e);
				}
				insertBefore(t, e, n) {
					return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
				}
				removeChild(t, e) {
					return super.removeChild(this.nodeOrShadowRoot(t), e);
				}
				parentNode(t) {
					return this.nodeOrShadowRoot(
						super.parentNode(this.nodeOrShadowRoot(t))
					);
				}
			}
			let T = (() => {
				class t extends p {
					constructor(t) {
						super(t);
					}
					supports(t) {
						return !0;
					}
					addEventListener(t, e, n) {
						return (
							t.addEventListener(e, n, !1),
							() => this.removeEventListener(t, e, n)
						);
					}
					removeEventListener(t, e, n) {
						return t.removeEventListener(e, n);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(s.Ib(r.c));
					}),
					(t.ɵprov = s.zb({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const x = ['alt', 'control', 'meta', 'shift'],
				O = {
					'\b': 'Backspace',
					'\t': 'Tab',
					'\x7f': 'Delete',
					'\x1b': 'Escape',
					Del: 'Delete',
					Esc: 'Escape',
					Left: 'ArrowLeft',
					Right: 'ArrowRight',
					Up: 'ArrowUp',
					Down: 'ArrowDown',
					Menu: 'ContextMenu',
					Scroll: 'ScrollLock',
					Win: 'OS'
				},
				k = {
					A: '1',
					B: '2',
					C: '3',
					D: '4',
					E: '5',
					F: '6',
					G: '7',
					H: '8',
					I: '9',
					J: '*',
					K: '+',
					M: '-',
					N: '.',
					O: '/',
					'`': '0',
					'\x90': 'NumLock'
				},
				A = {
					alt: (t) => t.altKey,
					control: (t) => t.ctrlKey,
					meta: (t) => t.metaKey,
					shift: (t) => t.shiftKey
				};
			let I = (() => {
				class t extends p {
					constructor(t) {
						super(t);
					}
					supports(e) {
						return null != t.parseEventName(e);
					}
					addEventListener(e, n, s) {
						const i = t.parseEventName(n),
							o = t.eventCallback(
								i.fullKey,
								s,
								this.manager.getZone()
							);
						return this.manager
							.getZone()
							.runOutsideAngular(() =>
								Object(r.m)().onAndCancel(e, i.domEventName, o)
							);
					}
					static parseEventName(e) {
						const n = e.toLowerCase().split('.'),
							r = n.shift();
						if (
							0 === n.length ||
							('keydown' !== r && 'keyup' !== r)
						)
							return null;
						const s = t._normalizeKey(n.pop());
						let i = '';
						if (
							(x.forEach((t) => {
								const e = n.indexOf(t);
								e > -1 && (n.splice(e, 1), (i += t + '.'));
							}),
							(i += s),
							0 != n.length || 0 === s.length)
						)
							return null;
						const o = {};
						return (o.domEventName = r), (o.fullKey = i), o;
					}
					static getEventFullKey(t) {
						let e = '',
							n = (function (t) {
								let e = t.key;
								if (null == e) {
									if (((e = t.keyIdentifier), null == e))
										return 'Unidentified';
									e.startsWith('U+') &&
										((e = String.fromCharCode(
											parseInt(e.substring(2), 16)
										)),
										3 === t.location &&
											k.hasOwnProperty(e) &&
											(e = k[e]));
								}
								return O[e] || e;
							})(t);
						return (
							(n = n.toLowerCase()),
							' ' === n
								? (n = 'space')
								: '.' === n && (n = 'dot'),
							x.forEach((r) => {
								r != n && (0, A[r])(t) && (e += r + '.');
							}),
							(e += n),
							e
						);
					}
					static eventCallback(e, n, r) {
						return (s) => {
							t.getEventFullKey(s) === e &&
								r.runGuarded(() => n(s));
						};
					}
					static _normalizeKey(t) {
						switch (t) {
							case 'esc':
								return 'escape';
							default:
								return t;
						}
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(s.Ib(r.c));
					}),
					(t.ɵprov = s.zb({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const j = [
					{ provide: s.C, useValue: r.l },
					{
						provide: s.D,
						useValue: function () {
							o.makeCurrent(), h.init();
						},
						multi: !0
					},
					{
						provide: r.c,
						useFactory: function () {
							return Object(s.rb)(document), document;
						},
						deps: []
					}
				],
				R = Object(s.R)(s.T, 'browser', j),
				P = [
					[],
					{ provide: s.W, useValue: 'root' },
					{
						provide: s.m,
						useFactory: function () {
							return new s.m();
						},
						deps: []
					},
					{
						provide: d,
						useClass: T,
						multi: !0,
						deps: [r.c, s.A, s.C]
					},
					{ provide: d, useClass: I, multi: !0, deps: [r.c] },
					[],
					{ provide: w, useClass: w, deps: [f, g, s.c] },
					{ provide: s.F, useExisting: w },
					{ provide: m, useExisting: g },
					{ provide: g, useClass: g, deps: [r.c] },
					{ provide: s.M, useClass: s.M, deps: [s.A] },
					{ provide: f, useClass: f, deps: [d, s.A] },
					[]
				];
			let N = (() => {
				class t {
					constructor(t) {
						if (t)
							throw new Error(
								'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.'
							);
					}
					static withServerTransition(e) {
						return {
							ngModule: t,
							providers: [
								{ provide: s.c, useValue: e.appId },
								{ provide: c, useExisting: s.c },
								u
							]
						};
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(s.Ib(t, 12));
					}),
					(t.ɵmod = s.Bb({ type: t })),
					(t.ɵinj = s.Ab({ providers: P, imports: [r.b, s.f] })),
					t
				);
			})();
			'undefined' != typeof window && window;
			var D = n('tyNb');
			let F = (() => {
				class t {}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵcmp = s.xb({
						type: t,
						selectors: [['app-root']],
						decls: 1,
						vars: 0,
						template: function (t, e) {
							1 & t && s.Eb(0, 'router-outlet');
						},
						directives: [D.b],
						styles: ['']
					})),
					t
				);
			})();
			class L {}
			const M = '*';
			function U(t, e = null) {
				return { type: 2, steps: t, options: e };
			}
			function H(t) {
				return { type: 6, styles: t, offset: null };
			}
			function $(t) {
				Promise.resolve(null).then(t);
			}
			class z {
				constructor(t = 0, e = 0) {
					(this._onDoneFns = []),
						(this._onStartFns = []),
						(this._onDestroyFns = []),
						(this._started = !1),
						(this._destroyed = !1),
						(this._finished = !1),
						(this._position = 0),
						(this.parentPlayer = null),
						(this.totalTime = t + e);
				}
				_onFinish() {
					this._finished ||
						((this._finished = !0),
						this._onDoneFns.forEach((t) => t()),
						(this._onDoneFns = []));
				}
				onStart(t) {
					this._onStartFns.push(t);
				}
				onDone(t) {
					this._onDoneFns.push(t);
				}
				onDestroy(t) {
					this._onDestroyFns.push(t);
				}
				hasStarted() {
					return this._started;
				}
				init() {}
				play() {
					this.hasStarted() ||
						(this._onStart(), this.triggerMicrotask()),
						(this._started = !0);
				}
				triggerMicrotask() {
					$(() => this._onFinish());
				}
				_onStart() {
					this._onStartFns.forEach((t) => t()),
						(this._onStartFns = []);
				}
				pause() {}
				restart() {}
				finish() {
					this._onFinish();
				}
				destroy() {
					this._destroyed ||
						((this._destroyed = !0),
						this.hasStarted() || this._onStart(),
						this.finish(),
						this._onDestroyFns.forEach((t) => t()),
						(this._onDestroyFns = []));
				}
				reset() {}
				setPosition(t) {
					this._position = this.totalTime ? t * this.totalTime : 1;
				}
				getPosition() {
					return this.totalTime ? this._position / this.totalTime : 1;
				}
				triggerCallback(t) {
					const e = 'start' == t ? this._onStartFns : this._onDoneFns;
					e.forEach((t) => t()), (e.length = 0);
				}
			}
			class q {
				constructor(t) {
					(this._onDoneFns = []),
						(this._onStartFns = []),
						(this._finished = !1),
						(this._started = !1),
						(this._destroyed = !1),
						(this._onDestroyFns = []),
						(this.parentPlayer = null),
						(this.totalTime = 0),
						(this.players = t);
					let e = 0,
						n = 0,
						r = 0;
					const s = this.players.length;
					0 == s
						? $(() => this._onFinish())
						: this.players.forEach((t) => {
								t.onDone(() => {
									++e == s && this._onFinish();
								}),
									t.onDestroy(() => {
										++n == s && this._onDestroy();
									}),
									t.onStart(() => {
										++r == s && this._onStart();
									});
						  }),
						(this.totalTime = this.players.reduce(
							(t, e) => Math.max(t, e.totalTime),
							0
						));
				}
				_onFinish() {
					this._finished ||
						((this._finished = !0),
						this._onDoneFns.forEach((t) => t()),
						(this._onDoneFns = []));
				}
				init() {
					this.players.forEach((t) => t.init());
				}
				onStart(t) {
					this._onStartFns.push(t);
				}
				_onStart() {
					this.hasStarted() ||
						((this._started = !0),
						this._onStartFns.forEach((t) => t()),
						(this._onStartFns = []));
				}
				onDone(t) {
					this._onDoneFns.push(t);
				}
				onDestroy(t) {
					this._onDestroyFns.push(t);
				}
				hasStarted() {
					return this._started;
				}
				play() {
					this.parentPlayer || this.init(),
						this._onStart(),
						this.players.forEach((t) => t.play());
				}
				pause() {
					this.players.forEach((t) => t.pause());
				}
				restart() {
					this.players.forEach((t) => t.restart());
				}
				finish() {
					this._onFinish(), this.players.forEach((t) => t.finish());
				}
				destroy() {
					this._onDestroy();
				}
				_onDestroy() {
					this._destroyed ||
						((this._destroyed = !0),
						this._onFinish(),
						this.players.forEach((t) => t.destroy()),
						this._onDestroyFns.forEach((t) => t()),
						(this._onDestroyFns = []));
				}
				reset() {
					this.players.forEach((t) => t.reset()),
						(this._destroyed = !1),
						(this._finished = !1),
						(this._started = !1);
				}
				setPosition(t) {
					const e = t * this.totalTime;
					this.players.forEach((t) => {
						const n = t.totalTime
							? Math.min(1, e / t.totalTime)
							: 1;
						t.setPosition(n);
					});
				}
				getPosition() {
					const t = this.players.reduce(
						(t, e) =>
							null === t || e.totalTime > t.totalTime ? e : t,
						null
					);
					return null != t ? t.getPosition() : 0;
				}
				beforeDestroy() {
					this.players.forEach((t) => {
						t.beforeDestroy && t.beforeDestroy();
					});
				}
				triggerCallback(t) {
					const e = 'start' == t ? this._onStartFns : this._onDoneFns;
					e.forEach((t) => t()), (e.length = 0);
				}
			}
			function V() {
				return (
					'undefined' != typeof process &&
					'[object process]' === {}.toString.call(process)
				);
			}
			function B(t) {
				switch (t.length) {
					case 0:
						return new z();
					case 1:
						return t[0];
					default:
						return new q(t);
				}
			}
			function Q(t, e, n, r, s = {}, i = {}) {
				const o = [],
					a = [];
				let l = -1,
					c = null;
				if (
					(r.forEach((t) => {
						const n = t.offset,
							r = n == l,
							u = (r && c) || {};
						Object.keys(t).forEach((n) => {
							let r = n,
								a = t[n];
							if ('offset' !== n)
								switch (
									((r = e.normalizePropertyName(r, o)), a)
								) {
									case '!':
										a = s[n];
										break;
									case M:
										a = i[n];
										break;
									default:
										a = e.normalizeStyleValue(n, r, a, o);
								}
							u[r] = a;
						}),
							r || a.push(u),
							(c = u),
							(l = n);
					}),
					o.length)
				) {
					const t = '\n - ';
					throw new Error(
						`Unable to animate due to the following errors:${t}${o.join(
							t
						)}`
					);
				}
				return a;
			}
			function W(t, e, n, r) {
				switch (e) {
					case 'start':
						t.onStart(() => r(n && Z(n, 'start', t)));
						break;
					case 'done':
						t.onDone(() => r(n && Z(n, 'done', t)));
						break;
					case 'destroy':
						t.onDestroy(() => r(n && Z(n, 'destroy', t)));
				}
			}
			function Z(t, e, n) {
				const r = n.totalTime,
					s = G(
						t.element,
						t.triggerName,
						t.fromState,
						t.toState,
						e || t.phaseName,
						null == r ? t.totalTime : r,
						!!n.disabled
					),
					i = t._data;
				return null != i && (s._data = i), s;
			}
			function G(t, e, n, r, s = '', i = 0, o) {
				return {
					element: t,
					triggerName: e,
					fromState: n,
					toState: r,
					phaseName: s,
					totalTime: i,
					disabled: !!o
				};
			}
			function K(t, e, n) {
				let r;
				return (
					t instanceof Map
						? ((r = t.get(e)), r || t.set(e, (r = n)))
						: ((r = t[e]), r || (r = t[e] = n)),
					r
				);
			}
			function J(t) {
				const e = t.indexOf(':');
				return [t.substring(1, e), t.substr(e + 1)];
			}
			let X = (t, e) => !1,
				Y = (t, e) => !1,
				tt = (t, e, n) => [];
			const et = V();
			(et || 'undefined' != typeof Element) &&
				((X = (t, e) => t.contains(e)),
				(Y = (() => {
					if (et || Element.prototype.matches)
						return (t, e) => t.matches(e);
					{
						const t = Element.prototype,
							e =
								t.matchesSelector ||
								t.mozMatchesSelector ||
								t.msMatchesSelector ||
								t.oMatchesSelector ||
								t.webkitMatchesSelector;
						return e ? (t, n) => e.apply(t, [n]) : Y;
					}
				})()),
				(tt = (t, e, n) => {
					let r = [];
					if (n) {
						const n = t.querySelectorAll(e);
						for (let t = 0; t < n.length; t++) r.push(n[t]);
					} else {
						const n = t.querySelector(e);
						n && r.push(n);
					}
					return r;
				}));
			let nt = null,
				rt = !1;
			function st(t) {
				nt ||
					((nt =
						('undefined' != typeof document
							? document.body
							: null) || {}),
					(rt = !!nt.style && 'WebkitAppearance' in nt.style));
				let e = !0;
				return (
					nt.style &&
						!(function (t) {
							return 'ebkit' == t.substring(1, 6);
						})(t) &&
						((e = t in nt.style), !e && rt) &&
						(e =
							'Webkit' +
								t.charAt(0).toUpperCase() +
								t.substr(1) in
							nt.style),
					e
				);
			}
			const it = Y,
				ot = X,
				at = tt;
			function lt(t) {
				const e = {};
				return (
					Object.keys(t).forEach((n) => {
						const r = n.replace(/([a-z])([A-Z])/g, '$1-$2');
						e[r] = t[n];
					}),
					e
				);
			}
			let ct = (() => {
					class t {
						validateStyleProperty(t) {
							return st(t);
						}
						matchesElement(t, e) {
							return it(t, e);
						}
						containsElement(t, e) {
							return ot(t, e);
						}
						query(t, e, n) {
							return at(t, e, n);
						}
						computeStyle(t, e, n) {
							return n || '';
						}
						animate(t, e, n, r, s, i = [], o) {
							return new z(n, r);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵprov = s.zb({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				ut = (() => {
					class t {}
					return (t.NOOP = new ct()), t;
				})();
			const ht = 'ng-enter',
				dt = 'ng-leave',
				ft = 'ng-trigger',
				pt = '.ng-trigger',
				mt = 'ng-animating',
				gt = '.ng-animating';
			function yt(t) {
				if ('number' == typeof t) return t;
				const e = t.match(/^(-?[\.\d]+)(m?s)/);
				return !e || e.length < 2 ? 0 : _t(parseFloat(e[1]), e[2]);
			}
			function _t(t, e) {
				switch (e) {
					case 's':
						return 1e3 * t;
					default:
						return t;
				}
			}
			function bt(t, e, n) {
				return t.hasOwnProperty('duration')
					? t
					: (function (t, e, n) {
							let r,
								s = 0,
								i = '';
							if ('string' == typeof t) {
								const n = t.match(
									/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
								);
								if (null === n)
									return (
										e.push(
											`The provided timing value "${t}" is invalid.`
										),
										{ duration: 0, delay: 0, easing: '' }
									);
								r = _t(parseFloat(n[1]), n[2]);
								const o = n[3];
								null != o && (s = _t(parseFloat(o), n[4]));
								const a = n[5];
								a && (i = a);
							} else r = t;
							if (!n) {
								let n = !1,
									i = e.length;
								r < 0 &&
									(e.push(
										'Duration values below 0 are not allowed for this animation step.'
									),
									(n = !0)),
									s < 0 &&
										(e.push(
											'Delay values below 0 are not allowed for this animation step.'
										),
										(n = !0)),
									n &&
										e.splice(
											i,
											0,
											`The provided timing value "${t}" is invalid.`
										);
							}
							return { duration: r, delay: s, easing: i };
					  })(t, e, n);
			}
			function vt(t, e = {}) {
				return (
					Object.keys(t).forEach((n) => {
						e[n] = t[n];
					}),
					e
				);
			}
			function wt(t, e, n = {}) {
				if (e) for (let r in t) n[r] = t[r];
				else vt(t, n);
				return n;
			}
			function St(t, e, n) {
				return n ? e + ':' + n + ';' : '';
			}
			function Et(t) {
				let e = '';
				for (let n = 0; n < t.style.length; n++) {
					const r = t.style.item(n);
					e += St(0, r, t.style.getPropertyValue(r));
				}
				for (const n in t.style)
					t.style.hasOwnProperty(n) &&
						!n.startsWith('_') &&
						(e += St(
							0,
							n.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
							t.style[n]
						));
				t.setAttribute('style', e);
			}
			function Ct(t, e, n) {
				t.style &&
					(Object.keys(e).forEach((r) => {
						const s = Rt(r);
						n && !n.hasOwnProperty(r) && (n[r] = t.style[s]),
							(t.style[s] = e[r]);
					}),
					V() && Et(t));
			}
			function Tt(t, e) {
				t.style &&
					(Object.keys(e).forEach((e) => {
						const n = Rt(e);
						t.style[n] = '';
					}),
					V() && Et(t));
			}
			function xt(t) {
				return Array.isArray(t) ? (1 == t.length ? t[0] : U(t)) : t;
			}
			const Ot = new RegExp('{{\\s*(.+?)\\s*}}', 'g');
			function kt(t) {
				let e = [];
				if ('string' == typeof t) {
					let n;
					for (; (n = Ot.exec(t)); ) e.push(n[1]);
					Ot.lastIndex = 0;
				}
				return e;
			}
			function At(t, e, n) {
				const r = t.toString(),
					s = r.replace(Ot, (t, r) => {
						let s = e[r];
						return (
							e.hasOwnProperty(r) ||
								(n.push(
									`Please provide a value for the animation param ${r}`
								),
								(s = '')),
							s.toString()
						);
					});
				return s == r ? t : s;
			}
			function It(t) {
				const e = [];
				let n = t.next();
				for (; !n.done; ) e.push(n.value), (n = t.next());
				return e;
			}
			const jt = /-+([a-z0-9])/g;
			function Rt(t) {
				return t.replace(jt, (...t) => t[1].toUpperCase());
			}
			function Pt(t, e) {
				return 0 === t || 0 === e;
			}
			function Nt(t, e, n) {
				const r = Object.keys(n);
				if (r.length && e.length) {
					let i = e[0],
						o = [];
					if (
						(r.forEach((t) => {
							i.hasOwnProperty(t) || o.push(t), (i[t] = n[t]);
						}),
						o.length)
					)
						for (var s = 1; s < e.length; s++) {
							let n = e[s];
							o.forEach(function (e) {
								n[e] = Ft(t, e);
							});
						}
				}
				return e;
			}
			function Dt(t, e, n) {
				switch (e.type) {
					case 7:
						return t.visitTrigger(e, n);
					case 0:
						return t.visitState(e, n);
					case 1:
						return t.visitTransition(e, n);
					case 2:
						return t.visitSequence(e, n);
					case 3:
						return t.visitGroup(e, n);
					case 4:
						return t.visitAnimate(e, n);
					case 5:
						return t.visitKeyframes(e, n);
					case 6:
						return t.visitStyle(e, n);
					case 8:
						return t.visitReference(e, n);
					case 9:
						return t.visitAnimateChild(e, n);
					case 10:
						return t.visitAnimateRef(e, n);
					case 11:
						return t.visitQuery(e, n);
					case 12:
						return t.visitStagger(e, n);
					default:
						throw new Error(
							`Unable to resolve animation metadata node #${e.type}`
						);
				}
			}
			function Ft(t, e) {
				return window.getComputedStyle(t)[e];
			}
			const Lt = '*';
			function Mt(t, e) {
				const n = [];
				return (
					'string' == typeof t
						? t.split(/\s*,\s*/).forEach((t) =>
								(function (t, e, n) {
									if (':' == t[0]) {
										const r = (function (t, e) {
											switch (t) {
												case ':enter':
													return 'void => *';
												case ':leave':
													return '* => void';
												case ':increment':
													return (t, e) =>
														parseFloat(e) >
														parseFloat(t);
												case ':decrement':
													return (t, e) =>
														parseFloat(e) <
														parseFloat(t);
												default:
													return (
														e.push(
															`The transition alias value "${t}" is not supported`
														),
														'* => *'
													);
											}
										})(t, n);
										if ('function' == typeof r)
											return void e.push(r);
										t = r;
									}
									const r = t.match(
										/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/
									);
									if (null == r || r.length < 4)
										return (
											n.push(
												`The provided transition expression "${t}" is not supported`
											),
											e
										);
									const s = r[1],
										i = r[2],
										o = r[3];
									e.push($t(s, o)),
										'<' != i[0] ||
											(s == Lt && o == Lt) ||
											e.push($t(o, s));
								})(t, n, e)
						  )
						: n.push(t),
					n
				);
			}
			const Ut = new Set(['true', '1']),
				Ht = new Set(['false', '0']);
			function $t(t, e) {
				const n = Ut.has(t) || Ht.has(t),
					r = Ut.has(e) || Ht.has(e);
				return (s, i) => {
					let o = t == Lt || t == s,
						a = e == Lt || e == i;
					return (
						!o &&
							n &&
							'boolean' == typeof s &&
							(o = s ? Ut.has(t) : Ht.has(t)),
						!a &&
							r &&
							'boolean' == typeof i &&
							(a = i ? Ut.has(e) : Ht.has(e)),
						o && a
					);
				};
			}
			const zt = new RegExp('s*:selfs*,?', 'g');
			function qt(t, e, n) {
				return new Vt(t).build(e, n);
			}
			class Vt {
				constructor(t) {
					this._driver = t;
				}
				build(t, e) {
					const n = new Bt(e);
					return (
						this._resetContextStyleTimingState(n),
						Dt(this, xt(t), n)
					);
				}
				_resetContextStyleTimingState(t) {
					(t.currentQuerySelector = ''),
						(t.collectedStyles = {}),
						(t.collectedStyles[''] = {}),
						(t.currentTime = 0);
				}
				visitTrigger(t, e) {
					let n = (e.queryCount = 0),
						r = (e.depCount = 0);
					const s = [],
						i = [];
					return (
						'@' == t.name.charAt(0) &&
							e.errors.push(
								"animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
							),
						t.definitions.forEach((t) => {
							if (
								(this._resetContextStyleTimingState(e),
								0 == t.type)
							) {
								const n = t,
									r = n.name;
								r
									.toString()
									.split(/\s*,\s*/)
									.forEach((t) => {
										(n.name = t),
											s.push(this.visitState(n, e));
									}),
									(n.name = r);
							} else if (1 == t.type) {
								const s = this.visitTransition(t, e);
								(n += s.queryCount),
									(r += s.depCount),
									i.push(s);
							} else
								e.errors.push(
									'only state() and transition() definitions can sit inside of a trigger()'
								);
						}),
						{
							type: 7,
							name: t.name,
							states: s,
							transitions: i,
							queryCount: n,
							depCount: r,
							options: null
						}
					);
				}
				visitState(t, e) {
					const n = this.visitStyle(t.styles, e),
						r = (t.options && t.options.params) || null;
					if (n.containsDynamicStyles) {
						const s = new Set(),
							i = r || {};
						if (
							(n.styles.forEach((t) => {
								if (Qt(t)) {
									const e = t;
									Object.keys(e).forEach((t) => {
										kt(e[t]).forEach((t) => {
											i.hasOwnProperty(t) || s.add(t);
										});
									});
								}
							}),
							s.size)
						) {
							const n = It(s.values());
							e.errors.push(
								`state("${
									t.name
								}", ...) must define default values for all the following style substitutions: ${n.join(
									', '
								)}`
							);
						}
					}
					return {
						type: 0,
						name: t.name,
						style: n,
						options: r ? { params: r } : null
					};
				}
				visitTransition(t, e) {
					(e.queryCount = 0), (e.depCount = 0);
					const n = Dt(this, xt(t.animation), e);
					return {
						type: 1,
						matchers: Mt(t.expr, e.errors),
						animation: n,
						queryCount: e.queryCount,
						depCount: e.depCount,
						options: Wt(t.options)
					};
				}
				visitSequence(t, e) {
					return {
						type: 2,
						steps: t.steps.map((t) => Dt(this, t, e)),
						options: Wt(t.options)
					};
				}
				visitGroup(t, e) {
					const n = e.currentTime;
					let r = 0;
					const s = t.steps.map((t) => {
						e.currentTime = n;
						const s = Dt(this, t, e);
						return (r = Math.max(r, e.currentTime)), s;
					});
					return (
						(e.currentTime = r),
						{ type: 3, steps: s, options: Wt(t.options) }
					);
				}
				visitAnimate(t, e) {
					const n = (function (t, e) {
						let n = null;
						if (t.hasOwnProperty('duration')) n = t;
						else if ('number' == typeof t)
							return Zt(bt(t, e).duration, 0, '');
						const r = t;
						if (
							r
								.split(/\s+/)
								.some(
									(t) =>
										'{' == t.charAt(0) && '{' == t.charAt(1)
								)
						) {
							const t = Zt(0, 0, '');
							return (t.dynamic = !0), (t.strValue = r), t;
						}
						return (
							(n = n || bt(r, e)),
							Zt(n.duration, n.delay, n.easing)
						);
					})(t.timings, e.errors);
					let r;
					e.currentAnimateTimings = n;
					let s = t.styles ? t.styles : H({});
					if (5 == s.type) r = this.visitKeyframes(s, e);
					else {
						let s = t.styles,
							i = !1;
						if (!s) {
							i = !0;
							const t = {};
							n.easing && (t.easing = n.easing), (s = H(t));
						}
						e.currentTime += n.duration + n.delay;
						const o = this.visitStyle(s, e);
						(o.isEmptyStep = i), (r = o);
					}
					return (
						(e.currentAnimateTimings = null),
						{ type: 4, timings: n, style: r, options: null }
					);
				}
				visitStyle(t, e) {
					const n = this._makeStyleAst(t, e);
					return this._validateStyleAst(n, e), n;
				}
				_makeStyleAst(t, e) {
					const n = [];
					Array.isArray(t.styles)
						? t.styles.forEach((t) => {
								'string' == typeof t
									? t == M
										? n.push(t)
										: e.errors.push(
												`The provided style string value ${t} is not allowed.`
										  )
									: n.push(t);
						  })
						: n.push(t.styles);
					let r = !1,
						s = null;
					return (
						n.forEach((t) => {
							if (Qt(t)) {
								const e = t,
									n = e.easing;
								if ((n && ((s = n), delete e.easing), !r))
									for (let t in e)
										if (
											e[t].toString().indexOf('{{') >= 0
										) {
											r = !0;
											break;
										}
							}
						}),
						{
							type: 6,
							styles: n,
							easing: s,
							offset: t.offset,
							containsDynamicStyles: r,
							options: null
						}
					);
				}
				_validateStyleAst(t, e) {
					const n = e.currentAnimateTimings;
					let r = e.currentTime,
						s = e.currentTime;
					n && s > 0 && (s -= n.duration + n.delay),
						t.styles.forEach((t) => {
							'string' != typeof t &&
								Object.keys(t).forEach((n) => {
									if (!this._driver.validateStyleProperty(n))
										return void e.errors.push(
											`The provided animation property "${n}" is not a supported CSS property for animations`
										);
									const i =
											e.collectedStyles[
												e.currentQuerySelector
											],
										o = i[n];
									let a = !0;
									o &&
										(s != r &&
											s >= o.startTime &&
											r <= o.endTime &&
											(e.errors.push(
												`The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${s}ms" and "${r}ms"`
											),
											(a = !1)),
										(s = o.startTime)),
										a &&
											(i[n] = {
												startTime: s,
												endTime: r
											}),
										e.options &&
											(function (t, e, n) {
												const r = e.params || {},
													s = kt(t);
												s.length &&
													s.forEach((t) => {
														r.hasOwnProperty(t) ||
															n.push(
																`Unable to resolve the local animation param ${t} in the given list of values`
															);
													});
											})(t[n], e.options, e.errors);
								});
						});
				}
				visitKeyframes(t, e) {
					const n = { type: 5, styles: [], options: null };
					if (!e.currentAnimateTimings)
						return (
							e.errors.push(
								'keyframes() must be placed inside of a call to animate()'
							),
							n
						);
					let r = 0;
					const s = [];
					let i = !1,
						o = !1,
						a = 0;
					const l = t.steps.map((t) => {
						const n = this._makeStyleAst(t, e);
						let l =
								null != n.offset
									? n.offset
									: (function (t) {
											if ('string' == typeof t)
												return null;
											let e = null;
											if (Array.isArray(t))
												t.forEach((t) => {
													if (
														Qt(t) &&
														t.hasOwnProperty(
															'offset'
														)
													) {
														const n = t;
														(e = parseFloat(
															n.offset
														)),
															delete n.offset;
													}
												});
											else if (
												Qt(t) &&
												t.hasOwnProperty('offset')
											) {
												const n = t;
												(e = parseFloat(n.offset)),
													delete n.offset;
											}
											return e;
									  })(n.styles),
							c = 0;
						return (
							null != l && (r++, (c = n.offset = l)),
							(o = o || c < 0 || c > 1),
							(i = i || c < a),
							(a = c),
							s.push(c),
							n
						);
					});
					o &&
						e.errors.push(
							'Please ensure that all keyframe offsets are between 0 and 1'
						),
						i &&
							e.errors.push(
								'Please ensure that all keyframe offsets are in order'
							);
					const c = t.steps.length;
					let u = 0;
					r > 0 && r < c
						? e.errors.push(
								'Not all style() steps within the declared keyframes() contain offsets'
						  )
						: 0 == r && (u = 1 / (c - 1));
					const h = c - 1,
						d = e.currentTime,
						f = e.currentAnimateTimings,
						p = f.duration;
					return (
						l.forEach((t, r) => {
							const i = u > 0 ? (r == h ? 1 : u * r) : s[r],
								o = i * p;
							(e.currentTime = d + f.delay + o),
								(f.duration = o),
								this._validateStyleAst(t, e),
								(t.offset = i),
								n.styles.push(t);
						}),
						n
					);
				}
				visitReference(t, e) {
					return {
						type: 8,
						animation: Dt(this, xt(t.animation), e),
						options: Wt(t.options)
					};
				}
				visitAnimateChild(t, e) {
					return e.depCount++, { type: 9, options: Wt(t.options) };
				}
				visitAnimateRef(t, e) {
					return {
						type: 10,
						animation: this.visitReference(t.animation, e),
						options: Wt(t.options)
					};
				}
				visitQuery(t, e) {
					const n = e.currentQuerySelector,
						r = t.options || {};
					e.queryCount++, (e.currentQuery = t);
					const [s, i] = (function (t) {
						const e = !!t
							.split(/\s*,\s*/)
							.find((t) => ':self' == t);
						return (
							e && (t = t.replace(zt, '')),
							[
								(t = t
									.replace(/@\*/g, pt)
									.replace(
										/@\w+/g,
										(t) => '.ng-trigger-' + t.substr(1)
									)
									.replace(/:animating/g, gt)),
								e
							]
						);
					})(t.selector);
					(e.currentQuerySelector = n.length ? n + ' ' + s : s),
						K(e.collectedStyles, e.currentQuerySelector, {});
					const o = Dt(this, xt(t.animation), e);
					return (
						(e.currentQuery = null),
						(e.currentQuerySelector = n),
						{
							type: 11,
							selector: s,
							limit: r.limit || 0,
							optional: !!r.optional,
							includeSelf: i,
							animation: o,
							originalSelector: t.selector,
							options: Wt(t.options)
						}
					);
				}
				visitStagger(t, e) {
					e.currentQuery ||
						e.errors.push(
							'stagger() can only be used inside of query()'
						);
					const n =
						'full' === t.timings
							? { duration: 0, delay: 0, easing: 'full' }
							: bt(t.timings, e.errors, !0);
					return {
						type: 12,
						animation: Dt(this, xt(t.animation), e),
						timings: n,
						options: null
					};
				}
			}
			class Bt {
				constructor(t) {
					(this.errors = t),
						(this.queryCount = 0),
						(this.depCount = 0),
						(this.currentTransition = null),
						(this.currentQuery = null),
						(this.currentQuerySelector = null),
						(this.currentAnimateTimings = null),
						(this.currentTime = 0),
						(this.collectedStyles = {}),
						(this.options = null);
				}
			}
			function Qt(t) {
				return !Array.isArray(t) && 'object' == typeof t;
			}
			function Wt(t) {
				var e;
				return (
					t
						? (t = vt(t)).params &&
						  (t.params = (e = t.params) ? vt(e) : null)
						: (t = {}),
					t
				);
			}
			function Zt(t, e, n) {
				return { duration: t, delay: e, easing: n };
			}
			function Gt(t, e, n, r, s, i, o = null, a = !1) {
				return {
					type: 1,
					element: t,
					keyframes: e,
					preStyleProps: n,
					postStyleProps: r,
					duration: s,
					delay: i,
					totalTime: s + i,
					easing: o,
					subTimeline: a
				};
			}
			class Kt {
				constructor() {
					this._map = new Map();
				}
				consume(t) {
					let e = this._map.get(t);
					return e ? this._map.delete(t) : (e = []), e;
				}
				append(t, e) {
					let n = this._map.get(t);
					n || this._map.set(t, (n = [])), n.push(...e);
				}
				has(t) {
					return this._map.has(t);
				}
				clear() {
					this._map.clear();
				}
			}
			const Jt = new RegExp(':enter', 'g'),
				Xt = new RegExp(':leave', 'g');
			function Yt(t, e, n, r, s, i = {}, o = {}, a, l, c = []) {
				return new te().buildKeyframes(t, e, n, r, s, i, o, a, l, c);
			}
			class te {
				buildKeyframes(t, e, n, r, s, i, o, a, l, c = []) {
					l = l || new Kt();
					const u = new ne(t, e, l, r, s, c, []);
					(u.options = a),
						u.currentTimeline.setStyles([i], null, u.errors, a),
						Dt(this, n, u);
					const h = u.timelines.filter((t) => t.containsAnimation());
					if (h.length && Object.keys(o).length) {
						const t = h[h.length - 1];
						t.allowOnlyTimelineStyles() ||
							t.setStyles([o], null, u.errors, a);
					}
					return h.length
						? h.map((t) => t.buildKeyframes())
						: [Gt(e, [], [], [], 0, 0, '', !1)];
				}
				visitTrigger(t, e) {}
				visitState(t, e) {}
				visitTransition(t, e) {}
				visitAnimateChild(t, e) {
					const n = e.subInstructions.consume(e.element);
					if (n) {
						const r = e.createSubContext(t.options),
							s = e.currentTimeline.currentTime,
							i = this._visitSubInstructions(n, r, r.options);
						s != i && e.transformIntoNewTimeline(i);
					}
					e.previousNode = t;
				}
				visitAnimateRef(t, e) {
					const n = e.createSubContext(t.options);
					n.transformIntoNewTimeline(),
						this.visitReference(t.animation, n),
						e.transformIntoNewTimeline(
							n.currentTimeline.currentTime
						),
						(e.previousNode = t);
				}
				_visitSubInstructions(t, e, n) {
					let r = e.currentTimeline.currentTime;
					const s = null != n.duration ? yt(n.duration) : null,
						i = null != n.delay ? yt(n.delay) : null;
					return (
						0 !== s &&
							t.forEach((t) => {
								const n = e.appendInstructionToTimeline(
									t,
									s,
									i
								);
								r = Math.max(r, n.duration + n.delay);
							}),
						r
					);
				}
				visitReference(t, e) {
					e.updateOptions(t.options, !0),
						Dt(this, t.animation, e),
						(e.previousNode = t);
				}
				visitSequence(t, e) {
					const n = e.subContextCount;
					let r = e;
					const s = t.options;
					if (
						s &&
						(s.params || s.delay) &&
						((r = e.createSubContext(s)),
						r.transformIntoNewTimeline(),
						null != s.delay)
					) {
						6 == r.previousNode.type &&
							(r.currentTimeline.snapshotCurrentStyles(),
							(r.previousNode = ee));
						const t = yt(s.delay);
						r.delayNextStep(t);
					}
					t.steps.length &&
						(t.steps.forEach((t) => Dt(this, t, r)),
						r.currentTimeline.applyStylesToKeyframe(),
						r.subContextCount > n && r.transformIntoNewTimeline()),
						(e.previousNode = t);
				}
				visitGroup(t, e) {
					const n = [];
					let r = e.currentTimeline.currentTime;
					const s =
						t.options && t.options.delay ? yt(t.options.delay) : 0;
					t.steps.forEach((i) => {
						const o = e.createSubContext(t.options);
						s && o.delayNextStep(s),
							Dt(this, i, o),
							(r = Math.max(r, o.currentTimeline.currentTime)),
							n.push(o.currentTimeline);
					}),
						n.forEach((t) =>
							e.currentTimeline.mergeTimelineCollectedStyles(t)
						),
						e.transformIntoNewTimeline(r),
						(e.previousNode = t);
				}
				_visitTiming(t, e) {
					if (t.dynamic) {
						const n = t.strValue;
						return bt(
							e.params ? At(n, e.params, e.errors) : n,
							e.errors
						);
					}
					return {
						duration: t.duration,
						delay: t.delay,
						easing: t.easing
					};
				}
				visitAnimate(t, e) {
					const n = (e.currentAnimateTimings = this._visitTiming(
							t.timings,
							e
						)),
						r = e.currentTimeline;
					n.delay &&
						(e.incrementTime(n.delay), r.snapshotCurrentStyles());
					const s = t.style;
					5 == s.type
						? this.visitKeyframes(s, e)
						: (e.incrementTime(n.duration),
						  this.visitStyle(s, e),
						  r.applyStylesToKeyframe()),
						(e.currentAnimateTimings = null),
						(e.previousNode = t);
				}
				visitStyle(t, e) {
					const n = e.currentTimeline,
						r = e.currentAnimateTimings;
					!r &&
						n.getCurrentStyleProperties().length &&
						n.forwardFrame();
					const s = (r && r.easing) || t.easing;
					t.isEmptyStep
						? n.applyEmptyStep(s)
						: n.setStyles(t.styles, s, e.errors, e.options),
						(e.previousNode = t);
				}
				visitKeyframes(t, e) {
					const n = e.currentAnimateTimings,
						r = e.currentTimeline.duration,
						s = n.duration,
						i = e.createSubContext().currentTimeline;
					(i.easing = n.easing),
						t.styles.forEach((t) => {
							i.forwardTime((t.offset || 0) * s),
								i.setStyles(
									t.styles,
									t.easing,
									e.errors,
									e.options
								),
								i.applyStylesToKeyframe();
						}),
						e.currentTimeline.mergeTimelineCollectedStyles(i),
						e.transformIntoNewTimeline(r + s),
						(e.previousNode = t);
				}
				visitQuery(t, e) {
					const n = e.currentTimeline.currentTime,
						r = t.options || {},
						s = r.delay ? yt(r.delay) : 0;
					s &&
						(6 === e.previousNode.type ||
							(0 == n &&
								e.currentTimeline.getCurrentStyleProperties()
									.length)) &&
						(e.currentTimeline.snapshotCurrentStyles(),
						(e.previousNode = ee));
					let i = n;
					const o = e.invokeQuery(
						t.selector,
						t.originalSelector,
						t.limit,
						t.includeSelf,
						!!r.optional,
						e.errors
					);
					e.currentQueryTotal = o.length;
					let a = null;
					o.forEach((n, r) => {
						e.currentQueryIndex = r;
						const o = e.createSubContext(t.options, n);
						s && o.delayNextStep(s),
							n === e.element && (a = o.currentTimeline),
							Dt(this, t.animation, o),
							o.currentTimeline.applyStylesToKeyframe(),
							(i = Math.max(i, o.currentTimeline.currentTime));
					}),
						(e.currentQueryIndex = 0),
						(e.currentQueryTotal = 0),
						e.transformIntoNewTimeline(i),
						a &&
							(e.currentTimeline.mergeTimelineCollectedStyles(a),
							e.currentTimeline.snapshotCurrentStyles()),
						(e.previousNode = t);
				}
				visitStagger(t, e) {
					const n = e.parentContext,
						r = e.currentTimeline,
						s = t.timings,
						i = Math.abs(s.duration),
						o = i * (e.currentQueryTotal - 1);
					let a = i * e.currentQueryIndex;
					switch (s.duration < 0 ? 'reverse' : s.easing) {
						case 'reverse':
							a = o - a;
							break;
						case 'full':
							a = n.currentStaggerTime;
					}
					const l = e.currentTimeline;
					a && l.delayNextStep(a);
					const c = l.currentTime;
					Dt(this, t.animation, e),
						(e.previousNode = t),
						(n.currentStaggerTime =
							r.currentTime -
							c +
							(r.startTime - n.currentTimeline.startTime));
				}
			}
			const ee = {};
			class ne {
				constructor(t, e, n, r, s, i, o, a) {
					(this._driver = t),
						(this.element = e),
						(this.subInstructions = n),
						(this._enterClassName = r),
						(this._leaveClassName = s),
						(this.errors = i),
						(this.timelines = o),
						(this.parentContext = null),
						(this.currentAnimateTimings = null),
						(this.previousNode = ee),
						(this.subContextCount = 0),
						(this.options = {}),
						(this.currentQueryIndex = 0),
						(this.currentQueryTotal = 0),
						(this.currentStaggerTime = 0),
						(this.currentTimeline =
							a || new re(this._driver, e, 0)),
						o.push(this.currentTimeline);
				}
				get params() {
					return this.options.params;
				}
				updateOptions(t, e) {
					if (!t) return;
					const n = t;
					let r = this.options;
					null != n.duration && (r.duration = yt(n.duration)),
						null != n.delay && (r.delay = yt(n.delay));
					const s = n.params;
					if (s) {
						let t = r.params;
						t || (t = this.options.params = {}),
							Object.keys(s).forEach((n) => {
								(e && t.hasOwnProperty(n)) ||
									(t[n] = At(s[n], t, this.errors));
							});
					}
				}
				_copyOptions() {
					const t = {};
					if (this.options) {
						const e = this.options.params;
						if (e) {
							const n = (t.params = {});
							Object.keys(e).forEach((t) => {
								n[t] = e[t];
							});
						}
					}
					return t;
				}
				createSubContext(t = null, e, n) {
					const r = e || this.element,
						s = new ne(
							this._driver,
							r,
							this.subInstructions,
							this._enterClassName,
							this._leaveClassName,
							this.errors,
							this.timelines,
							this.currentTimeline.fork(r, n || 0)
						);
					return (
						(s.previousNode = this.previousNode),
						(s.currentAnimateTimings = this.currentAnimateTimings),
						(s.options = this._copyOptions()),
						s.updateOptions(t),
						(s.currentQueryIndex = this.currentQueryIndex),
						(s.currentQueryTotal = this.currentQueryTotal),
						(s.parentContext = this),
						this.subContextCount++,
						s
					);
				}
				transformIntoNewTimeline(t) {
					return (
						(this.previousNode = ee),
						(this.currentTimeline = this.currentTimeline.fork(
							this.element,
							t
						)),
						this.timelines.push(this.currentTimeline),
						this.currentTimeline
					);
				}
				appendInstructionToTimeline(t, e, n) {
					const r = {
							duration: null != e ? e : t.duration,
							delay:
								this.currentTimeline.currentTime +
								(null != n ? n : 0) +
								t.delay,
							easing: ''
						},
						s = new se(
							this._driver,
							t.element,
							t.keyframes,
							t.preStyleProps,
							t.postStyleProps,
							r,
							t.stretchStartingKeyframe
						);
					return this.timelines.push(s), r;
				}
				incrementTime(t) {
					this.currentTimeline.forwardTime(
						this.currentTimeline.duration + t
					);
				}
				delayNextStep(t) {
					t > 0 && this.currentTimeline.delayNextStep(t);
				}
				invokeQuery(t, e, n, r, s, i) {
					let o = [];
					if ((r && o.push(this.element), t.length > 0)) {
						t = (t = t.replace(
							Jt,
							'.' + this._enterClassName
						)).replace(Xt, '.' + this._leaveClassName);
						let e = this._driver.query(this.element, t, 1 != n);
						0 !== n &&
							(e =
								n < 0
									? e.slice(e.length + n, e.length)
									: e.slice(0, n)),
							o.push(...e);
					}
					return (
						s ||
							0 != o.length ||
							i.push(
								`\`query("${e}")\` returned zero elements. (Use \`query("${e}", { optional: true })\` if you wish to allow this.)`
							),
						o
					);
				}
			}
			class re {
				constructor(t, e, n, r) {
					(this._driver = t),
						(this.element = e),
						(this.startTime = n),
						(this._elementTimelineStylesLookup = r),
						(this.duration = 0),
						(this._previousKeyframe = {}),
						(this._currentKeyframe = {}),
						(this._keyframes = new Map()),
						(this._styleSummary = {}),
						(this._pendingStyles = {}),
						(this._backFill = {}),
						(this._currentEmptyStepKeyframe = null),
						this._elementTimelineStylesLookup ||
							(this._elementTimelineStylesLookup = new Map()),
						(this._localTimelineStyles = Object.create(
							this._backFill,
							{}
						)),
						(this._globalTimelineStyles = this._elementTimelineStylesLookup.get(
							e
						)),
						this._globalTimelineStyles ||
							((this._globalTimelineStyles = this._localTimelineStyles),
							this._elementTimelineStylesLookup.set(
								e,
								this._localTimelineStyles
							)),
						this._loadKeyframe();
				}
				containsAnimation() {
					switch (this._keyframes.size) {
						case 0:
							return !1;
						case 1:
							return this.getCurrentStyleProperties().length > 0;
						default:
							return !0;
					}
				}
				getCurrentStyleProperties() {
					return Object.keys(this._currentKeyframe);
				}
				get currentTime() {
					return this.startTime + this.duration;
				}
				delayNextStep(t) {
					const e =
						1 == this._keyframes.size &&
						Object.keys(this._pendingStyles).length;
					this.duration || e
						? (this.forwardTime(this.currentTime + t),
						  e && this.snapshotCurrentStyles())
						: (this.startTime += t);
				}
				fork(t, e) {
					return (
						this.applyStylesToKeyframe(),
						new re(
							this._driver,
							t,
							e || this.currentTime,
							this._elementTimelineStylesLookup
						)
					);
				}
				_loadKeyframe() {
					this._currentKeyframe &&
						(this._previousKeyframe = this._currentKeyframe),
						(this._currentKeyframe = this._keyframes.get(
							this.duration
						)),
						this._currentKeyframe ||
							((this._currentKeyframe = Object.create(
								this._backFill,
								{}
							)),
							this._keyframes.set(
								this.duration,
								this._currentKeyframe
							));
				}
				forwardFrame() {
					(this.duration += 1), this._loadKeyframe();
				}
				forwardTime(t) {
					this.applyStylesToKeyframe(),
						(this.duration = t),
						this._loadKeyframe();
				}
				_updateStyle(t, e) {
					(this._localTimelineStyles[t] = e),
						(this._globalTimelineStyles[t] = e),
						(this._styleSummary[t] = {
							time: this.currentTime,
							value: e
						});
				}
				allowOnlyTimelineStyles() {
					return (
						this._currentEmptyStepKeyframe !== this._currentKeyframe
					);
				}
				applyEmptyStep(t) {
					t && (this._previousKeyframe.easing = t),
						Object.keys(this._globalTimelineStyles).forEach((t) => {
							(this._backFill[t] =
								this._globalTimelineStyles[t] || M),
								(this._currentKeyframe[t] = M);
						}),
						(this._currentEmptyStepKeyframe = this._currentKeyframe);
				}
				setStyles(t, e, n, r) {
					e && (this._previousKeyframe.easing = e);
					const s = (r && r.params) || {},
						i = (function (t, e) {
							const n = {};
							let r;
							return (
								t.forEach((t) => {
									'*' === t
										? ((r = r || Object.keys(e)),
										  r.forEach((t) => {
												n[t] = M;
										  }))
										: wt(t, !1, n);
								}),
								n
							);
						})(t, this._globalTimelineStyles);
					Object.keys(i).forEach((t) => {
						const e = At(i[t], s, n);
						(this._pendingStyles[t] = e),
							this._localTimelineStyles.hasOwnProperty(t) ||
								(this._backFill[
									t
								] = this._globalTimelineStyles.hasOwnProperty(t)
									? this._globalTimelineStyles[t]
									: M),
							this._updateStyle(t, e);
					});
				}
				applyStylesToKeyframe() {
					const t = this._pendingStyles,
						e = Object.keys(t);
					0 != e.length &&
						((this._pendingStyles = {}),
						e.forEach((e) => {
							this._currentKeyframe[e] = t[e];
						}),
						Object.keys(this._localTimelineStyles).forEach((t) => {
							this._currentKeyframe.hasOwnProperty(t) ||
								(this._currentKeyframe[
									t
								] = this._localTimelineStyles[t]);
						}));
				}
				snapshotCurrentStyles() {
					Object.keys(this._localTimelineStyles).forEach((t) => {
						const e = this._localTimelineStyles[t];
						(this._pendingStyles[t] = e), this._updateStyle(t, e);
					});
				}
				getFinalKeyframe() {
					return this._keyframes.get(this.duration);
				}
				get properties() {
					const t = [];
					for (let e in this._currentKeyframe) t.push(e);
					return t;
				}
				mergeTimelineCollectedStyles(t) {
					Object.keys(t._styleSummary).forEach((e) => {
						const n = this._styleSummary[e],
							r = t._styleSummary[e];
						(!n || r.time > n.time) &&
							this._updateStyle(e, r.value);
					});
				}
				buildKeyframes() {
					this.applyStylesToKeyframe();
					const t = new Set(),
						e = new Set(),
						n = 1 === this._keyframes.size && 0 === this.duration;
					let r = [];
					this._keyframes.forEach((s, i) => {
						const o = wt(s, !0);
						Object.keys(o).forEach((n) => {
							const r = o[n];
							'!' == r ? t.add(n) : r == M && e.add(n);
						}),
							n || (o.offset = i / this.duration),
							r.push(o);
					});
					const s = t.size ? It(t.values()) : [],
						i = e.size ? It(e.values()) : [];
					if (n) {
						const t = r[0],
							e = vt(t);
						(t.offset = 0), (e.offset = 1), (r = [t, e]);
					}
					return Gt(
						this.element,
						r,
						s,
						i,
						this.duration,
						this.startTime,
						this.easing,
						!1
					);
				}
			}
			class se extends re {
				constructor(t, e, n, r, s, i, o = !1) {
					super(t, e, i.delay),
						(this.element = e),
						(this.keyframes = n),
						(this.preStyleProps = r),
						(this.postStyleProps = s),
						(this._stretchStartingKeyframe = o),
						(this.timings = {
							duration: i.duration,
							delay: i.delay,
							easing: i.easing
						});
				}
				containsAnimation() {
					return this.keyframes.length > 1;
				}
				buildKeyframes() {
					let t = this.keyframes,
						{ delay: e, duration: n, easing: r } = this.timings;
					if (this._stretchStartingKeyframe && e) {
						const s = [],
							i = n + e,
							o = e / i,
							a = wt(t[0], !1);
						(a.offset = 0), s.push(a);
						const l = wt(t[0], !1);
						(l.offset = ie(o)), s.push(l);
						const c = t.length - 1;
						for (let r = 1; r <= c; r++) {
							let o = wt(t[r], !1);
							(o.offset = ie((e + o.offset * n) / i)), s.push(o);
						}
						(n = i), (e = 0), (r = ''), (t = s);
					}
					return Gt(
						this.element,
						t,
						this.preStyleProps,
						this.postStyleProps,
						n,
						e,
						r,
						!0
					);
				}
			}
			function ie(t, e = 3) {
				const n = Math.pow(10, e - 1);
				return Math.round(t * n) / n;
			}
			class oe {}
			class ae extends oe {
				normalizePropertyName(t, e) {
					return Rt(t);
				}
				normalizeStyleValue(t, e, n, r) {
					let s = '';
					const i = n.toString().trim();
					if (le[e] && 0 !== n && '0' !== n)
						if ('number' == typeof n) s = 'px';
						else {
							const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
							e &&
								0 == e[1].length &&
								r.push(
									`Please provide a CSS unit value for ${t}:${n}`
								);
						}
					return i + s;
				}
			}
			const le = (() =>
				(function (t) {
					const e = {};
					return t.forEach((t) => (e[t] = !0)), e;
				})(
					'width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective'.split(
						','
					)
				))();
			function ce(t, e, n, r, s, i, o, a, l, c, u, h, d) {
				return {
					type: 0,
					element: t,
					triggerName: e,
					isRemovalTransition: s,
					fromState: n,
					fromStyles: i,
					toState: r,
					toStyles: o,
					timelines: a,
					queriedElements: l,
					preStyleProps: c,
					postStyleProps: u,
					totalTime: h,
					errors: d
				};
			}
			const ue = {};
			class he {
				constructor(t, e, n) {
					(this._triggerName = t),
						(this.ast = e),
						(this._stateStyles = n);
				}
				match(t, e, n, r) {
					return (function (t, e, n, r, s) {
						return t.some((t) => t(e, n, r, s));
					})(this.ast.matchers, t, e, n, r);
				}
				buildStyles(t, e, n) {
					const r = this._stateStyles['*'],
						s = this._stateStyles[t],
						i = r ? r.buildStyles(e, n) : {};
					return s ? s.buildStyles(e, n) : i;
				}
				build(t, e, n, r, s, i, o, a, l, c) {
					const u = [],
						h = (this.ast.options && this.ast.options.params) || ue,
						d = this.buildStyles(n, (o && o.params) || ue, u),
						f = (a && a.params) || ue,
						p = this.buildStyles(r, f, u),
						m = new Set(),
						g = new Map(),
						y = new Map(),
						_ = 'void' === r,
						b = { params: Object.assign(Object.assign({}, h), f) },
						v = c
							? []
							: Yt(t, e, this.ast.animation, s, i, d, p, b, l, u);
					let w = 0;
					if (
						(v.forEach((t) => {
							w = Math.max(t.duration + t.delay, w);
						}),
						u.length)
					)
						return ce(
							e,
							this._triggerName,
							n,
							r,
							_,
							d,
							p,
							[],
							[],
							g,
							y,
							w,
							u
						);
					v.forEach((t) => {
						const n = t.element,
							r = K(g, n, {});
						t.preStyleProps.forEach((t) => (r[t] = !0));
						const s = K(y, n, {});
						t.postStyleProps.forEach((t) => (s[t] = !0)),
							n !== e && m.add(n);
					});
					const S = It(m.values());
					return ce(
						e,
						this._triggerName,
						n,
						r,
						_,
						d,
						p,
						v,
						S,
						g,
						y,
						w
					);
				}
			}
			class de {
				constructor(t, e) {
					(this.styles = t), (this.defaultParams = e);
				}
				buildStyles(t, e) {
					const n = {},
						r = vt(this.defaultParams);
					return (
						Object.keys(t).forEach((e) => {
							const n = t[e];
							null != n && (r[e] = n);
						}),
						this.styles.styles.forEach((t) => {
							if ('string' != typeof t) {
								const s = t;
								Object.keys(s).forEach((t) => {
									let i = s[t];
									i.length > 1 && (i = At(i, r, e)),
										(n[t] = i);
								});
							}
						}),
						n
					);
				}
			}
			class fe {
				constructor(t, e) {
					(this.name = t),
						(this.ast = e),
						(this.transitionFactories = []),
						(this.states = {}),
						e.states.forEach((t) => {
							this.states[t.name] = new de(
								t.style,
								(t.options && t.options.params) || {}
							);
						}),
						pe(this.states, 'true', '1'),
						pe(this.states, 'false', '0'),
						e.transitions.forEach((e) => {
							this.transitionFactories.push(
								new he(t, e, this.states)
							);
						}),
						(this.fallbackTransition = new he(
							t,
							{
								type: 1,
								animation: {
									type: 2,
									steps: [],
									options: null
								},
								matchers: [(t, e) => !0],
								options: null,
								queryCount: 0,
								depCount: 0
							},
							this.states
						));
				}
				get containsQueries() {
					return this.ast.queryCount > 0;
				}
				matchTransition(t, e, n, r) {
					return (
						this.transitionFactories.find((s) =>
							s.match(t, e, n, r)
						) || null
					);
				}
				matchStyles(t, e, n) {
					return this.fallbackTransition.buildStyles(t, e, n);
				}
			}
			function pe(t, e, n) {
				t.hasOwnProperty(e)
					? t.hasOwnProperty(n) || (t[n] = t[e])
					: t.hasOwnProperty(n) && (t[e] = t[n]);
			}
			const me = new Kt();
			class ge {
				constructor(t, e, n) {
					(this.bodyNode = t),
						(this._driver = e),
						(this._normalizer = n),
						(this._animations = {}),
						(this._playersById = {}),
						(this.players = []);
				}
				register(t, e) {
					const n = [],
						r = qt(this._driver, e, n);
					if (n.length)
						throw new Error(
							`Unable to build the animation due to the following errors: ${n.join(
								'\n'
							)}`
						);
					this._animations[t] = r;
				}
				_buildPlayer(t, e, n) {
					const r = t.element,
						s = Q(0, this._normalizer, 0, t.keyframes, e, n);
					return this._driver.animate(
						r,
						s,
						t.duration,
						t.delay,
						t.easing,
						[],
						!0
					);
				}
				create(t, e, n = {}) {
					const r = [],
						s = this._animations[t];
					let i;
					const o = new Map();
					if (
						(s
							? ((i = Yt(
									this._driver,
									e,
									s,
									ht,
									dt,
									{},
									{},
									n,
									me,
									r
							  )),
							  i.forEach((t) => {
									const e = K(o, t.element, {});
									t.postStyleProps.forEach(
										(t) => (e[t] = null)
									);
							  }))
							: (r.push(
									"The requested animation doesn't exist or has already been destroyed"
							  ),
							  (i = [])),
						r.length)
					)
						throw new Error(
							`Unable to create the animation due to the following errors: ${r.join(
								'\n'
							)}`
						);
					o.forEach((t, e) => {
						Object.keys(t).forEach((n) => {
							t[n] = this._driver.computeStyle(e, n, M);
						});
					});
					const a = B(
						i.map((t) => {
							const e = o.get(t.element);
							return this._buildPlayer(t, {}, e);
						})
					);
					return (
						(this._playersById[t] = a),
						a.onDestroy(() => this.destroy(t)),
						this.players.push(a),
						a
					);
				}
				destroy(t) {
					const e = this._getPlayer(t);
					e.destroy(), delete this._playersById[t];
					const n = this.players.indexOf(e);
					n >= 0 && this.players.splice(n, 1);
				}
				_getPlayer(t) {
					const e = this._playersById[t];
					if (!e)
						throw new Error(
							`Unable to find the timeline player referenced by ${t}`
						);
					return e;
				}
				listen(t, e, n, r) {
					const s = G(e, '', '', '');
					return W(this._getPlayer(t), n, s, r), () => {};
				}
				command(t, e, n, r) {
					if ('register' == n) return void this.register(t, r[0]);
					if ('create' == n)
						return void this.create(t, e, r[0] || {});
					const s = this._getPlayer(t);
					switch (n) {
						case 'play':
							s.play();
							break;
						case 'pause':
							s.pause();
							break;
						case 'reset':
							s.reset();
							break;
						case 'restart':
							s.restart();
							break;
						case 'finish':
							s.finish();
							break;
						case 'init':
							s.init();
							break;
						case 'setPosition':
							s.setPosition(parseFloat(r[0]));
							break;
						case 'destroy':
							this.destroy(t);
					}
				}
			}
			const ye = 'ng-animate-queued',
				_e = 'ng-animate-disabled',
				be = '.ng-animate-disabled',
				ve = [],
				we = {
					namespaceId: '',
					setForRemoval: !1,
					setForMove: !1,
					hasAnimation: !1,
					removedBeforeQueried: !1
				},
				Se = {
					namespaceId: '',
					setForMove: !1,
					setForRemoval: !1,
					hasAnimation: !1,
					removedBeforeQueried: !0
				};
			class Ee {
				constructor(t, e = '') {
					this.namespaceId = e;
					const n = t && t.hasOwnProperty('value');
					if (
						((this.value =
							null != (r = n ? t.value : t) ? r : null),
						n)
					) {
						const e = vt(t);
						delete e.value, (this.options = e);
					} else this.options = {};
					var r;
					this.options.params || (this.options.params = {});
				}
				get params() {
					return this.options.params;
				}
				absorbOptions(t) {
					const e = t.params;
					if (e) {
						const t = this.options.params;
						Object.keys(e).forEach((n) => {
							null == t[n] && (t[n] = e[n]);
						});
					}
				}
			}
			const Ce = 'void',
				Te = new Ee(Ce);
			class xe {
				constructor(t, e, n) {
					(this.id = t),
						(this.hostElement = e),
						(this._engine = n),
						(this.players = []),
						(this._triggers = {}),
						(this._queue = []),
						(this._elementListeners = new Map()),
						(this._hostClassName = 'ng-tns-' + t),
						Pe(e, this._hostClassName);
				}
				listen(t, e, n, r) {
					if (!this._triggers.hasOwnProperty(e))
						throw new Error(
							`Unable to listen on the animation trigger event "${n}" because the animation trigger "${e}" doesn't exist!`
						);
					if (null == n || 0 == n.length)
						throw new Error(
							`Unable to listen on the animation trigger "${e}" because the provided event is undefined!`
						);
					if ('start' != (s = n) && 'done' != s)
						throw new Error(
							`The provided animation trigger event "${n}" for the animation trigger "${e}" is not supported!`
						);
					var s;
					const i = K(this._elementListeners, t, []),
						o = { name: e, phase: n, callback: r };
					i.push(o);
					const a = K(this._engine.statesByElement, t, {});
					return (
						a.hasOwnProperty(e) ||
							(Pe(t, ft), Pe(t, 'ng-trigger-' + e), (a[e] = Te)),
						() => {
							this._engine.afterFlush(() => {
								const t = i.indexOf(o);
								t >= 0 && i.splice(t, 1),
									this._triggers[e] || delete a[e];
							});
						}
					);
				}
				register(t, e) {
					return !this._triggers[t] && ((this._triggers[t] = e), !0);
				}
				_getTrigger(t) {
					const e = this._triggers[t];
					if (!e)
						throw new Error(
							`The provided animation trigger "${t}" has not been registered!`
						);
					return e;
				}
				trigger(t, e, n, r = !0) {
					const s = this._getTrigger(e),
						i = new ke(this.id, e, t);
					let o = this._engine.statesByElement.get(t);
					o ||
						(Pe(t, ft),
						Pe(t, 'ng-trigger-' + e),
						this._engine.statesByElement.set(t, (o = {})));
					let a = o[e];
					const l = new Ee(n, this.id);
					if (
						(!(n && n.hasOwnProperty('value')) &&
							a &&
							l.absorbOptions(a.options),
						(o[e] = l),
						a || (a = Te),
						l.value !== Ce && a.value === l.value)
					) {
						if (
							!(function (t, e) {
								const n = Object.keys(t),
									r = Object.keys(e);
								if (n.length != r.length) return !1;
								for (let s = 0; s < n.length; s++) {
									const r = n[s];
									if (!e.hasOwnProperty(r) || t[r] !== e[r])
										return !1;
								}
								return !0;
							})(a.params, l.params)
						) {
							const e = [],
								n = s.matchStyles(a.value, a.params, e),
								r = s.matchStyles(l.value, l.params, e);
							e.length
								? this._engine.reportError(e)
								: this._engine.afterFlush(() => {
										Tt(t, n), Ct(t, r);
								  });
						}
						return;
					}
					const c = K(this._engine.playersByElement, t, []);
					c.forEach((t) => {
						t.namespaceId == this.id &&
							t.triggerName == e &&
							t.queued &&
							t.destroy();
					});
					let u = s.matchTransition(a.value, l.value, t, l.params),
						h = !1;
					if (!u) {
						if (!r) return;
						(u = s.fallbackTransition), (h = !0);
					}
					return (
						this._engine.totalQueuedPlayers++,
						this._queue.push({
							element: t,
							triggerName: e,
							transition: u,
							fromState: a,
							toState: l,
							player: i,
							isFallbackTransition: h
						}),
						h ||
							(Pe(t, ye),
							i.onStart(() => {
								Ne(t, ye);
							})),
						i.onDone(() => {
							let e = this.players.indexOf(i);
							e >= 0 && this.players.splice(e, 1);
							const n = this._engine.playersByElement.get(t);
							if (n) {
								let t = n.indexOf(i);
								t >= 0 && n.splice(t, 1);
							}
						}),
						this.players.push(i),
						c.push(i),
						i
					);
				}
				deregister(t) {
					delete this._triggers[t],
						this._engine.statesByElement.forEach((e, n) => {
							delete e[t];
						}),
						this._elementListeners.forEach((e, n) => {
							this._elementListeners.set(
								n,
								e.filter((e) => e.name != t)
							);
						});
				}
				clearElementCache(t) {
					this._engine.statesByElement.delete(t),
						this._elementListeners.delete(t);
					const e = this._engine.playersByElement.get(t);
					e &&
						(e.forEach((t) => t.destroy()),
						this._engine.playersByElement.delete(t));
				}
				_signalRemovalForInnerTriggers(t, e) {
					const n = this._engine.driver.query(t, pt, !0);
					n.forEach((t) => {
						if (t.__ng_removed) return;
						const n = this._engine.fetchNamespacesByElement(t);
						n.size
							? n.forEach((n) =>
									n.triggerLeaveAnimation(t, e, !1, !0)
							  )
							: this.clearElementCache(t);
					}),
						this._engine.afterFlushAnimationsDone(() =>
							n.forEach((t) => this.clearElementCache(t))
						);
				}
				triggerLeaveAnimation(t, e, n, r) {
					const s = this._engine.statesByElement.get(t);
					if (s) {
						const i = [];
						if (
							(Object.keys(s).forEach((e) => {
								if (this._triggers[e]) {
									const n = this.trigger(t, e, Ce, r);
									n && i.push(n);
								}
							}),
							i.length)
						)
							return (
								this._engine.markElementAsRemoved(
									this.id,
									t,
									!0,
									e
								),
								n &&
									B(i).onDone(() =>
										this._engine.processLeaveNode(t)
									),
								!0
							);
					}
					return !1;
				}
				prepareLeaveAnimationListeners(t) {
					const e = this._elementListeners.get(t),
						n = this._engine.statesByElement.get(t);
					if (e && n) {
						const r = new Set();
						e.forEach((e) => {
							const s = e.name;
							if (r.has(s)) return;
							r.add(s);
							const i = this._triggers[s].fallbackTransition,
								o = n[s] || Te,
								a = new Ee(Ce),
								l = new ke(this.id, s, t);
							this._engine.totalQueuedPlayers++,
								this._queue.push({
									element: t,
									triggerName: s,
									transition: i,
									fromState: o,
									toState: a,
									player: l,
									isFallbackTransition: !0
								});
						});
					}
				}
				removeNode(t, e) {
					const n = this._engine;
					if (
						(t.childElementCount &&
							this._signalRemovalForInnerTriggers(t, e),
						this.triggerLeaveAnimation(t, e, !0))
					)
						return;
					let r = !1;
					if (n.totalAnimations) {
						const e = n.players.length
							? n.playersByQueriedElement.get(t)
							: [];
						if (e && e.length) r = !0;
						else {
							let e = t;
							for (; (e = e.parentNode); )
								if (n.statesByElement.get(e)) {
									r = !0;
									break;
								}
						}
					}
					if ((this.prepareLeaveAnimationListeners(t), r))
						n.markElementAsRemoved(this.id, t, !1, e);
					else {
						const r = t.__ng_removed;
						(r && r !== we) ||
							(n.afterFlush(() => this.clearElementCache(t)),
							n.destroyInnerAnimations(t),
							n._onRemovalComplete(t, e));
					}
				}
				insertNode(t, e) {
					Pe(t, this._hostClassName);
				}
				drainQueuedTransitions(t) {
					const e = [];
					return (
						this._queue.forEach((n) => {
							const r = n.player;
							if (r.destroyed) return;
							const s = n.element,
								i = this._elementListeners.get(s);
							i &&
								i.forEach((e) => {
									if (e.name == n.triggerName) {
										const r = G(
											s,
											n.triggerName,
											n.fromState.value,
											n.toState.value
										);
										(r._data = t),
											W(n.player, e.phase, r, e.callback);
									}
								}),
								r.markedForDestroy
									? this._engine.afterFlush(() => {
											r.destroy();
									  })
									: e.push(n);
						}),
						(this._queue = []),
						e.sort((t, e) => {
							const n = t.transition.ast.depCount,
								r = e.transition.ast.depCount;
							return 0 == n || 0 == r
								? n - r
								: this._engine.driver.containsElement(
										t.element,
										e.element
								  )
								? 1
								: -1;
						})
					);
				}
				destroy(t) {
					this.players.forEach((t) => t.destroy()),
						this._signalRemovalForInnerTriggers(
							this.hostElement,
							t
						);
				}
				elementContainsData(t) {
					let e = !1;
					return (
						this._elementListeners.has(t) && (e = !0),
						(e = !!this._queue.find((e) => e.element === t) || e),
						e
					);
				}
			}
			class Oe {
				constructor(t, e, n) {
					(this.bodyNode = t),
						(this.driver = e),
						(this._normalizer = n),
						(this.players = []),
						(this.newHostElements = new Map()),
						(this.playersByElement = new Map()),
						(this.playersByQueriedElement = new Map()),
						(this.statesByElement = new Map()),
						(this.disabledNodes = new Set()),
						(this.totalAnimations = 0),
						(this.totalQueuedPlayers = 0),
						(this._namespaceLookup = {}),
						(this._namespaceList = []),
						(this._flushFns = []),
						(this._whenQuietFns = []),
						(this.namespacesByHostElement = new Map()),
						(this.collectedEnterElements = []),
						(this.collectedLeaveElements = []),
						(this.onRemovalComplete = (t, e) => {});
				}
				_onRemovalComplete(t, e) {
					this.onRemovalComplete(t, e);
				}
				get queuedPlayers() {
					const t = [];
					return (
						this._namespaceList.forEach((e) => {
							e.players.forEach((e) => {
								e.queued && t.push(e);
							});
						}),
						t
					);
				}
				createNamespace(t, e) {
					const n = new xe(t, e, this);
					return (
						e.parentNode
							? this._balanceNamespaceList(n, e)
							: (this.newHostElements.set(e, n),
							  this.collectEnterElement(e)),
						(this._namespaceLookup[t] = n)
					);
				}
				_balanceNamespaceList(t, e) {
					const n = this._namespaceList.length - 1;
					if (n >= 0) {
						let r = !1;
						for (let s = n; s >= 0; s--)
							if (
								this.driver.containsElement(
									this._namespaceList[s].hostElement,
									e
								)
							) {
								this._namespaceList.splice(s + 1, 0, t),
									(r = !0);
								break;
							}
						r || this._namespaceList.splice(0, 0, t);
					} else this._namespaceList.push(t);
					return this.namespacesByHostElement.set(e, t), t;
				}
				register(t, e) {
					let n = this._namespaceLookup[t];
					return n || (n = this.createNamespace(t, e)), n;
				}
				registerTrigger(t, e, n) {
					let r = this._namespaceLookup[t];
					r && r.register(e, n) && this.totalAnimations++;
				}
				destroy(t, e) {
					if (!t) return;
					const n = this._fetchNamespace(t);
					this.afterFlush(() => {
						this.namespacesByHostElement.delete(n.hostElement),
							delete this._namespaceLookup[t];
						const e = this._namespaceList.indexOf(n);
						e >= 0 && this._namespaceList.splice(e, 1);
					}),
						this.afterFlushAnimationsDone(() => n.destroy(e));
				}
				_fetchNamespace(t) {
					return this._namespaceLookup[t];
				}
				fetchNamespacesByElement(t) {
					const e = new Set(),
						n = this.statesByElement.get(t);
					if (n) {
						const t = Object.keys(n);
						for (let r = 0; r < t.length; r++) {
							const s = n[t[r]].namespaceId;
							if (s) {
								const t = this._fetchNamespace(s);
								t && e.add(t);
							}
						}
					}
					return e;
				}
				trigger(t, e, n, r) {
					if (Ae(e)) {
						const s = this._fetchNamespace(t);
						if (s) return s.trigger(e, n, r), !0;
					}
					return !1;
				}
				insertNode(t, e, n, r) {
					if (!Ae(e)) return;
					const s = e.__ng_removed;
					if (s && s.setForRemoval) {
						(s.setForRemoval = !1), (s.setForMove = !0);
						const t = this.collectedLeaveElements.indexOf(e);
						t >= 0 && this.collectedLeaveElements.splice(t, 1);
					}
					if (t) {
						const r = this._fetchNamespace(t);
						r && r.insertNode(e, n);
					}
					r && this.collectEnterElement(e);
				}
				collectEnterElement(t) {
					this.collectedEnterElements.push(t);
				}
				markElementAsDisabled(t, e) {
					e
						? this.disabledNodes.has(t) ||
						  (this.disabledNodes.add(t), Pe(t, _e))
						: this.disabledNodes.has(t) &&
						  (this.disabledNodes.delete(t), Ne(t, _e));
				}
				removeNode(t, e, n, r) {
					if (Ae(e)) {
						const s = t ? this._fetchNamespace(t) : null;
						if (
							(s
								? s.removeNode(e, r)
								: this.markElementAsRemoved(t, e, !1, r),
							n)
						) {
							const n = this.namespacesByHostElement.get(e);
							n && n.id !== t && n.removeNode(e, r);
						}
					} else this._onRemovalComplete(e, r);
				}
				markElementAsRemoved(t, e, n, r) {
					this.collectedLeaveElements.push(e),
						(e.__ng_removed = {
							namespaceId: t,
							setForRemoval: r,
							hasAnimation: n,
							removedBeforeQueried: !1
						});
				}
				listen(t, e, n, r, s) {
					return Ae(e)
						? this._fetchNamespace(t).listen(e, n, r, s)
						: () => {};
				}
				_buildInstruction(t, e, n, r, s) {
					return t.transition.build(
						this.driver,
						t.element,
						t.fromState.value,
						t.toState.value,
						n,
						r,
						t.fromState.options,
						t.toState.options,
						e,
						s
					);
				}
				destroyInnerAnimations(t) {
					let e = this.driver.query(t, pt, !0);
					e.forEach((t) => this.destroyActiveAnimationsForElement(t)),
						0 != this.playersByQueriedElement.size &&
							((e = this.driver.query(t, gt, !0)),
							e.forEach((t) =>
								this.finishActiveQueriedAnimationOnElement(t)
							));
				}
				destroyActiveAnimationsForElement(t) {
					const e = this.playersByElement.get(t);
					e &&
						e.forEach((t) => {
							t.queued ? (t.markedForDestroy = !0) : t.destroy();
						});
				}
				finishActiveQueriedAnimationOnElement(t) {
					const e = this.playersByQueriedElement.get(t);
					e && e.forEach((t) => t.finish());
				}
				whenRenderingDone() {
					return new Promise((t) => {
						if (this.players.length)
							return B(this.players).onDone(() => t());
						t();
					});
				}
				processLeaveNode(t) {
					const e = t.__ng_removed;
					if (e && e.setForRemoval) {
						if (((t.__ng_removed = we), e.namespaceId)) {
							this.destroyInnerAnimations(t);
							const n = this._fetchNamespace(e.namespaceId);
							n && n.clearElementCache(t);
						}
						this._onRemovalComplete(t, e.setForRemoval);
					}
					this.driver.matchesElement(t, be) &&
						this.markElementAsDisabled(t, !1),
						this.driver.query(t, be, !0).forEach((t) => {
							this.markElementAsDisabled(t, !1);
						});
				}
				flush(t = -1) {
					let e = [];
					if (
						(this.newHostElements.size &&
							(this.newHostElements.forEach((t, e) =>
								this._balanceNamespaceList(t, e)
							),
							this.newHostElements.clear()),
						this.totalAnimations &&
							this.collectedEnterElements.length)
					)
						for (
							let n = 0;
							n < this.collectedEnterElements.length;
							n++
						)
							Pe(
								this.collectedEnterElements[n],
								'ng-star-inserted'
							);
					if (
						this._namespaceList.length &&
						(this.totalQueuedPlayers ||
							this.collectedLeaveElements.length)
					) {
						const n = [];
						try {
							e = this._flushAnimations(n, t);
						} finally {
							for (let t = 0; t < n.length; t++) n[t]();
						}
					} else
						for (
							let n = 0;
							n < this.collectedLeaveElements.length;
							n++
						)
							this.processLeaveNode(
								this.collectedLeaveElements[n]
							);
					if (
						((this.totalQueuedPlayers = 0),
						(this.collectedEnterElements.length = 0),
						(this.collectedLeaveElements.length = 0),
						this._flushFns.forEach((t) => t()),
						(this._flushFns = []),
						this._whenQuietFns.length)
					) {
						const t = this._whenQuietFns;
						(this._whenQuietFns = []),
							e.length
								? B(e).onDone(() => {
										t.forEach((t) => t());
								  })
								: t.forEach((t) => t());
					}
				}
				reportError(t) {
					throw new Error(
						`Unable to process animations due to the following failed trigger transitions\n ${t.join(
							'\n'
						)}`
					);
				}
				_flushAnimations(t, e) {
					const n = new Kt(),
						r = [],
						s = new Map(),
						i = [],
						o = new Map(),
						a = new Map(),
						l = new Map(),
						c = new Set();
					this.disabledNodes.forEach((t) => {
						c.add(t);
						const e = this.driver.query(
							t,
							'.ng-animate-queued',
							!0
						);
						for (let n = 0; n < e.length; n++) c.add(e[n]);
					});
					const u = this.bodyNode,
						h = Array.from(this.statesByElement.keys()),
						d = Re(h, this.collectedEnterElements),
						f = new Map();
					let p = 0;
					d.forEach((t, e) => {
						const n = ht + p++;
						f.set(e, n), t.forEach((t) => Pe(t, n));
					});
					const m = [],
						g = new Set(),
						y = new Set();
					for (
						let I = 0;
						I < this.collectedLeaveElements.length;
						I++
					) {
						const t = this.collectedLeaveElements[I],
							e = t.__ng_removed;
						e &&
							e.setForRemoval &&
							(m.push(t),
							g.add(t),
							e.hasAnimation
								? this.driver
										.query(t, '.ng-star-inserted', !0)
										.forEach((t) => g.add(t))
								: y.add(t));
					}
					const _ = new Map(),
						b = Re(h, Array.from(g));
					b.forEach((t, e) => {
						const n = dt + p++;
						_.set(e, n), t.forEach((t) => Pe(t, n));
					}),
						t.push(() => {
							d.forEach((t, e) => {
								const n = f.get(e);
								t.forEach((t) => Ne(t, n));
							}),
								b.forEach((t, e) => {
									const n = _.get(e);
									t.forEach((t) => Ne(t, n));
								}),
								m.forEach((t) => {
									this.processLeaveNode(t);
								});
						});
					const v = [],
						w = [];
					for (let I = this._namespaceList.length - 1; I >= 0; I--)
						this._namespaceList[I].drainQueuedTransitions(
							e
						).forEach((t) => {
							const e = t.player,
								s = t.element;
							if (
								(v.push(e), this.collectedEnterElements.length)
							) {
								const t = s.__ng_removed;
								if (t && t.setForMove) return void e.destroy();
							}
							const c = !u || !this.driver.containsElement(u, s),
								h = _.get(s),
								d = f.get(s),
								p = this._buildInstruction(t, n, d, h, c);
							if (p.errors && p.errors.length) w.push(p);
							else {
								if (c)
									return (
										e.onStart(() => Tt(s, p.fromStyles)),
										e.onDestroy(() => Ct(s, p.toStyles)),
										void r.push(e)
									);
								if (t.isFallbackTransition)
									return (
										e.onStart(() => Tt(s, p.fromStyles)),
										e.onDestroy(() => Ct(s, p.toStyles)),
										void r.push(e)
									);
								p.timelines.forEach(
									(t) => (t.stretchStartingKeyframe = !0)
								),
									n.append(s, p.timelines),
									i.push({
										instruction: p,
										player: e,
										element: s
									}),
									p.queriedElements.forEach((t) =>
										K(o, t, []).push(e)
									),
									p.preStyleProps.forEach((t, e) => {
										const n = Object.keys(t);
										if (n.length) {
											let t = a.get(e);
											t || a.set(e, (t = new Set())),
												n.forEach((e) => t.add(e));
										}
									}),
									p.postStyleProps.forEach((t, e) => {
										const n = Object.keys(t);
										let r = l.get(e);
										r || l.set(e, (r = new Set())),
											n.forEach((t) => r.add(t));
									});
							}
						});
					if (w.length) {
						const t = [];
						w.forEach((e) => {
							t.push(`@${e.triggerName} has failed due to:\n`),
								e.errors.forEach((e) => t.push(`- ${e}\n`));
						}),
							v.forEach((t) => t.destroy()),
							this.reportError(t);
					}
					const S = new Map(),
						E = new Map();
					i.forEach((t) => {
						const e = t.element;
						n.has(e) &&
							(E.set(e, e),
							this._beforeAnimationBuild(
								t.player.namespaceId,
								t.instruction,
								S
							));
					}),
						r.forEach((t) => {
							const e = t.element;
							this._getPreviousPlayers(
								e,
								!1,
								t.namespaceId,
								t.triggerName,
								null
							).forEach((t) => {
								K(S, e, []).push(t), t.destroy();
							});
						});
					const C = m.filter((t) => Le(t, a, l)),
						T = new Map();
					je(T, this.driver, y, l, M).forEach((t) => {
						Le(t, a, l) && C.push(t);
					});
					const x = new Map();
					d.forEach((t, e) => {
						je(x, this.driver, new Set(t), a, '!');
					}),
						C.forEach((t) => {
							const e = T.get(t),
								n = x.get(t);
							T.set(t, Object.assign(Object.assign({}, e), n));
						});
					const O = [],
						k = [],
						A = {};
					i.forEach((t) => {
						const { element: e, player: i, instruction: o } = t;
						if (n.has(e)) {
							if (c.has(e))
								return (
									i.onDestroy(() => Ct(e, o.toStyles)),
									(i.disabled = !0),
									i.overrideTotalTime(o.totalTime),
									void r.push(i)
								);
							let t = A;
							if (E.size > 1) {
								let n = e;
								const r = [];
								for (; (n = n.parentNode); ) {
									const e = E.get(n);
									if (e) {
										t = e;
										break;
									}
									r.push(n);
								}
								r.forEach((e) => E.set(e, t));
							}
							const n = this._buildAnimation(
								i.namespaceId,
								o,
								S,
								s,
								x,
								T
							);
							if ((i.setRealPlayer(n), t === A)) O.push(i);
							else {
								const e = this.playersByElement.get(t);
								e && e.length && (i.parentPlayer = B(e)),
									r.push(i);
							}
						} else
							Tt(e, o.fromStyles),
								i.onDestroy(() => Ct(e, o.toStyles)),
								k.push(i),
								c.has(e) && r.push(i);
					}),
						k.forEach((t) => {
							const e = s.get(t.element);
							if (e && e.length) {
								const n = B(e);
								t.setRealPlayer(n);
							}
						}),
						r.forEach((t) => {
							t.parentPlayer
								? t.syncPlayerEvents(t.parentPlayer)
								: t.destroy();
						});
					for (let I = 0; I < m.length; I++) {
						const t = m[I],
							e = t.__ng_removed;
						if ((Ne(t, dt), e && e.hasAnimation)) continue;
						let n = [];
						if (o.size) {
							let e = o.get(t);
							e && e.length && n.push(...e);
							let r = this.driver.query(t, gt, !0);
							for (let t = 0; t < r.length; t++) {
								let e = o.get(r[t]);
								e && e.length && n.push(...e);
							}
						}
						const r = n.filter((t) => !t.destroyed);
						r.length ? De(this, t, r) : this.processLeaveNode(t);
					}
					return (
						(m.length = 0),
						O.forEach((t) => {
							this.players.push(t),
								t.onDone(() => {
									t.destroy();
									const e = this.players.indexOf(t);
									this.players.splice(e, 1);
								}),
								t.play();
						}),
						O
					);
				}
				elementContainsData(t, e) {
					let n = !1;
					const r = e.__ng_removed;
					return (
						r && r.setForRemoval && (n = !0),
						this.playersByElement.has(e) && (n = !0),
						this.playersByQueriedElement.has(e) && (n = !0),
						this.statesByElement.has(e) && (n = !0),
						this._fetchNamespace(t).elementContainsData(e) || n
					);
				}
				afterFlush(t) {
					this._flushFns.push(t);
				}
				afterFlushAnimationsDone(t) {
					this._whenQuietFns.push(t);
				}
				_getPreviousPlayers(t, e, n, r, s) {
					let i = [];
					if (e) {
						const e = this.playersByQueriedElement.get(t);
						e && (i = e);
					} else {
						const e = this.playersByElement.get(t);
						if (e) {
							const t = !s || s == Ce;
							e.forEach((e) => {
								e.queued ||
									((t || e.triggerName == r) && i.push(e));
							});
						}
					}
					return (
						(n || r) &&
							(i = i.filter(
								(t) =>
									!(
										(n && n != t.namespaceId) ||
										(r && r != t.triggerName)
									)
							)),
						i
					);
				}
				_beforeAnimationBuild(t, e, n) {
					const r = e.element,
						s = e.isRemovalTransition ? void 0 : t,
						i = e.isRemovalTransition ? void 0 : e.triggerName;
					for (const o of e.timelines) {
						const t = o.element,
							a = t !== r,
							l = K(n, t, []);
						this._getPreviousPlayers(t, a, s, i, e.toState).forEach(
							(t) => {
								const e = t.getRealPlayer();
								e.beforeDestroy && e.beforeDestroy(),
									t.destroy(),
									l.push(t);
							}
						);
					}
					Tt(r, e.fromStyles);
				}
				_buildAnimation(t, e, n, r, s, i) {
					const o = e.triggerName,
						a = e.element,
						l = [],
						c = new Set(),
						u = new Set(),
						h = e.timelines.map((e) => {
							const h = e.element;
							c.add(h);
							const d = h.__ng_removed;
							if (d && d.removedBeforeQueried)
								return new z(e.duration, e.delay);
							const f = h !== a,
								p = (function (t) {
									const e = [];
									return Fe(t, e), e;
								})(
									(n.get(h) || ve).map((t) =>
										t.getRealPlayer()
									)
								).filter((t) => !!t.element && t.element === h),
								m = s.get(h),
								g = i.get(h),
								y = Q(
									0,
									this._normalizer,
									0,
									e.keyframes,
									m,
									g
								),
								_ = this._buildPlayer(e, y, p);
							if ((e.subTimeline && r && u.add(h), f)) {
								const e = new ke(t, o, h);
								e.setRealPlayer(_), l.push(e);
							}
							return _;
						});
					l.forEach((t) => {
						K(this.playersByQueriedElement, t.element, []).push(t),
							t.onDone(() =>
								(function (t, e, n) {
									let r;
									if (t instanceof Map) {
										if (((r = t.get(e)), r)) {
											if (r.length) {
												const t = r.indexOf(n);
												r.splice(t, 1);
											}
											0 == r.length && t.delete(e);
										}
									} else if (((r = t[e]), r)) {
										if (r.length) {
											const t = r.indexOf(n);
											r.splice(t, 1);
										}
										0 == r.length && delete t[e];
									}
									return r;
								})(this.playersByQueriedElement, t.element, t)
							);
					}),
						c.forEach((t) => Pe(t, mt));
					const d = B(h);
					return (
						d.onDestroy(() => {
							c.forEach((t) => Ne(t, mt)), Ct(a, e.toStyles);
						}),
						u.forEach((t) => {
							K(r, t, []).push(d);
						}),
						d
					);
				}
				_buildPlayer(t, e, n) {
					return e.length > 0
						? this.driver.animate(
								t.element,
								e,
								t.duration,
								t.delay,
								t.easing,
								n
						  )
						: new z(t.duration, t.delay);
				}
			}
			class ke {
				constructor(t, e, n) {
					(this.namespaceId = t),
						(this.triggerName = e),
						(this.element = n),
						(this._player = new z()),
						(this._containsRealPlayer = !1),
						(this._queuedCallbacks = {}),
						(this.destroyed = !1),
						(this.markedForDestroy = !1),
						(this.disabled = !1),
						(this.queued = !0),
						(this.totalTime = 0);
				}
				setRealPlayer(t) {
					this._containsRealPlayer ||
						((this._player = t),
						Object.keys(this._queuedCallbacks).forEach((e) => {
							this._queuedCallbacks[e].forEach((n) =>
								W(t, e, void 0, n)
							);
						}),
						(this._queuedCallbacks = {}),
						(this._containsRealPlayer = !0),
						this.overrideTotalTime(t.totalTime),
						(this.queued = !1));
				}
				getRealPlayer() {
					return this._player;
				}
				overrideTotalTime(t) {
					this.totalTime = t;
				}
				syncPlayerEvents(t) {
					const e = this._player;
					e.triggerCallback &&
						t.onStart(() => e.triggerCallback('start')),
						t.onDone(() => this.finish()),
						t.onDestroy(() => this.destroy());
				}
				_queueEvent(t, e) {
					K(this._queuedCallbacks, t, []).push(e);
				}
				onDone(t) {
					this.queued && this._queueEvent('done', t),
						this._player.onDone(t);
				}
				onStart(t) {
					this.queued && this._queueEvent('start', t),
						this._player.onStart(t);
				}
				onDestroy(t) {
					this.queued && this._queueEvent('destroy', t),
						this._player.onDestroy(t);
				}
				init() {
					this._player.init();
				}
				hasStarted() {
					return !this.queued && this._player.hasStarted();
				}
				play() {
					!this.queued && this._player.play();
				}
				pause() {
					!this.queued && this._player.pause();
				}
				restart() {
					!this.queued && this._player.restart();
				}
				finish() {
					this._player.finish();
				}
				destroy() {
					(this.destroyed = !0), this._player.destroy();
				}
				reset() {
					!this.queued && this._player.reset();
				}
				setPosition(t) {
					this.queued || this._player.setPosition(t);
				}
				getPosition() {
					return this.queued ? 0 : this._player.getPosition();
				}
				triggerCallback(t) {
					const e = this._player;
					e.triggerCallback && e.triggerCallback(t);
				}
			}
			function Ae(t) {
				return t && 1 === t.nodeType;
			}
			function Ie(t, e) {
				const n = t.style.display;
				return (t.style.display = null != e ? e : 'none'), n;
			}
			function je(t, e, n, r, s) {
				const i = [];
				n.forEach((t) => i.push(Ie(t)));
				const o = [];
				r.forEach((n, r) => {
					const i = {};
					n.forEach((t) => {
						const n = (i[t] = e.computeStyle(r, t, s));
						(n && 0 != n.length) ||
							((r.__ng_removed = Se), o.push(r));
					}),
						t.set(r, i);
				});
				let a = 0;
				return n.forEach((t) => Ie(t, i[a++])), o;
			}
			function Re(t, e) {
				const n = new Map();
				if ((t.forEach((t) => n.set(t, [])), 0 == e.length)) return n;
				const r = new Set(e),
					s = new Map();
				function i(t) {
					if (!t) return 1;
					let e = s.get(t);
					if (e) return e;
					const o = t.parentNode;
					return (
						(e = n.has(o) ? o : r.has(o) ? 1 : i(o)), s.set(t, e), e
					);
				}
				return (
					e.forEach((t) => {
						const e = i(t);
						1 !== e && n.get(e).push(t);
					}),
					n
				);
			}
			function Pe(t, e) {
				if (t.classList) t.classList.add(e);
				else {
					let n = t.$$classes;
					n || (n = t.$$classes = {}), (n[e] = !0);
				}
			}
			function Ne(t, e) {
				if (t.classList) t.classList.remove(e);
				else {
					let n = t.$$classes;
					n && delete n[e];
				}
			}
			function De(t, e, n) {
				B(n).onDone(() => t.processLeaveNode(e));
			}
			function Fe(t, e) {
				for (let n = 0; n < t.length; n++) {
					const r = t[n];
					r instanceof q ? Fe(r.players, e) : e.push(r);
				}
			}
			function Le(t, e, n) {
				const r = n.get(t);
				if (!r) return !1;
				let s = e.get(t);
				return (
					s ? r.forEach((t) => s.add(t)) : e.set(t, r),
					n.delete(t),
					!0
				);
			}
			class Me {
				constructor(t, e, n) {
					(this.bodyNode = t),
						(this._driver = e),
						(this._triggerCache = {}),
						(this.onRemovalComplete = (t, e) => {}),
						(this._transitionEngine = new Oe(t, e, n)),
						(this._timelineEngine = new ge(t, e, n)),
						(this._transitionEngine.onRemovalComplete = (t, e) =>
							this.onRemovalComplete(t, e));
				}
				registerTrigger(t, e, n, r, s) {
					const i = t + '-' + r;
					let o = this._triggerCache[i];
					if (!o) {
						const t = [],
							e = qt(this._driver, s, t);
						if (t.length)
							throw new Error(
								`The animation trigger "${r}" has failed to build due to the following errors:\n - ${t.join(
									'\n - '
								)}`
							);
						(o = (function (t, e) {
							return new fe(t, e);
						})(r, e)),
							(this._triggerCache[i] = o);
					}
					this._transitionEngine.registerTrigger(e, r, o);
				}
				register(t, e) {
					this._transitionEngine.register(t, e);
				}
				destroy(t, e) {
					this._transitionEngine.destroy(t, e);
				}
				onInsert(t, e, n, r) {
					this._transitionEngine.insertNode(t, e, n, r);
				}
				onRemove(t, e, n, r) {
					this._transitionEngine.removeNode(t, e, r || !1, n);
				}
				disableAnimations(t, e) {
					this._transitionEngine.markElementAsDisabled(t, e);
				}
				process(t, e, n, r) {
					if ('@' == n.charAt(0)) {
						const [t, s] = J(n);
						this._timelineEngine.command(t, e, s, r);
					} else this._transitionEngine.trigger(t, e, n, r);
				}
				listen(t, e, n, r, s) {
					if ('@' == n.charAt(0)) {
						const [t, r] = J(n);
						return this._timelineEngine.listen(t, e, r, s);
					}
					return this._transitionEngine.listen(t, e, n, r, s);
				}
				flush(t = -1) {
					this._transitionEngine.flush(t);
				}
				get players() {
					return this._transitionEngine.players.concat(
						this._timelineEngine.players
					);
				}
				whenRenderingDone() {
					return this._transitionEngine.whenRenderingDone();
				}
			}
			function Ue(t, e) {
				let n = null,
					r = null;
				return (
					Array.isArray(e) && e.length
						? ((n = $e(e[0])),
						  e.length > 1 && (r = $e(e[e.length - 1])))
						: e && (n = $e(e)),
					n || r ? new He(t, n, r) : null
				);
			}
			let He = (() => {
				class t {
					constructor(e, n, r) {
						(this._element = e),
							(this._startStyles = n),
							(this._endStyles = r),
							(this._state = 0);
						let s = t.initialStylesByElement.get(e);
						s || t.initialStylesByElement.set(e, (s = {})),
							(this._initialStyles = s);
					}
					start() {
						this._state < 1 &&
							(this._startStyles &&
								Ct(
									this._element,
									this._startStyles,
									this._initialStyles
								),
							(this._state = 1));
					}
					finish() {
						this.start(),
							this._state < 2 &&
								(Ct(this._element, this._initialStyles),
								this._endStyles &&
									(Ct(this._element, this._endStyles),
									(this._endStyles = null)),
								(this._state = 1));
					}
					destroy() {
						this.finish(),
							this._state < 3 &&
								(t.initialStylesByElement.delete(this._element),
								this._startStyles &&
									(Tt(this._element, this._startStyles),
									(this._endStyles = null)),
								this._endStyles &&
									(Tt(this._element, this._endStyles),
									(this._endStyles = null)),
								Ct(this._element, this._initialStyles),
								(this._state = 3));
					}
				}
				return (t.initialStylesByElement = new WeakMap()), t;
			})();
			function $e(t) {
				let e = null;
				const n = Object.keys(t);
				for (let r = 0; r < n.length; r++) {
					const s = n[r];
					ze(s) && ((e = e || {}), (e[s] = t[s]));
				}
				return e;
			}
			function ze(t) {
				return 'display' === t || 'position' === t;
			}
			const qe = 'animation',
				Ve = 'animationend';
			class Be {
				constructor(t, e, n, r, s, i, o) {
					(this._element = t),
						(this._name = e),
						(this._duration = n),
						(this._delay = r),
						(this._easing = s),
						(this._fillMode = i),
						(this._onDoneFn = o),
						(this._finished = !1),
						(this._destroyed = !1),
						(this._startTime = 0),
						(this._position = 0),
						(this._eventFn = (t) => this._handleCallback(t));
				}
				apply() {
					!(function (t, e) {
						const n = Je(t, '').trim();
						n.length &&
							((function (t, e) {
								let n = 0;
								for (let r = 0; r < t.length; r++)
									',' === t.charAt(r) && n++;
							})(n),
							(e = `${n}, ${e}`)),
							Ke(t, '', e);
					})(
						this._element,
						`${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`
					),
						Ge(this._element, this._eventFn, !1),
						(this._startTime = Date.now());
				}
				pause() {
					Qe(this._element, this._name, 'paused');
				}
				resume() {
					Qe(this._element, this._name, 'running');
				}
				setPosition(t) {
					const e = We(this._element, this._name);
					(this._position = t * this._duration),
						Ke(this._element, 'Delay', `-${this._position}ms`, e);
				}
				getPosition() {
					return this._position;
				}
				_handleCallback(t) {
					const e = t._ngTestManualTimestamp || Date.now(),
						n = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
					t.animationName == this._name &&
						Math.max(e - this._startTime, 0) >= this._delay &&
						n >= this._duration &&
						this.finish();
				}
				finish() {
					this._finished ||
						((this._finished = !0),
						this._onDoneFn(),
						Ge(this._element, this._eventFn, !0));
				}
				destroy() {
					this._destroyed ||
						((this._destroyed = !0),
						this.finish(),
						(function (t, e) {
							const n = Je(t, '').split(','),
								r = Ze(n, e);
							r >= 0 && (n.splice(r, 1), Ke(t, '', n.join(',')));
						})(this._element, this._name));
				}
			}
			function Qe(t, e, n) {
				Ke(t, 'PlayState', n, We(t, e));
			}
			function We(t, e) {
				const n = Je(t, '');
				return n.indexOf(',') > 0 ? Ze(n.split(','), e) : Ze([n], e);
			}
			function Ze(t, e) {
				for (let n = 0; n < t.length; n++)
					if (t[n].indexOf(e) >= 0) return n;
				return -1;
			}
			function Ge(t, e, n) {
				n ? t.removeEventListener(Ve, e) : t.addEventListener(Ve, e);
			}
			function Ke(t, e, n, r) {
				const s = qe + e;
				if (null != r) {
					const e = t.style[s];
					if (e.length) {
						const t = e.split(',');
						(t[r] = n), (n = t.join(','));
					}
				}
				t.style[s] = n;
			}
			function Je(t, e) {
				return t.style[qe + e] || '';
			}
			class Xe {
				constructor(t, e, n, r, s, i, o, a) {
					(this.element = t),
						(this.keyframes = e),
						(this.animationName = n),
						(this._duration = r),
						(this._delay = s),
						(this._finalStyles = o),
						(this._specialStyles = a),
						(this._onDoneFns = []),
						(this._onStartFns = []),
						(this._onDestroyFns = []),
						(this._started = !1),
						(this.currentSnapshot = {}),
						(this._state = 0),
						(this.easing = i || 'linear'),
						(this.totalTime = r + s),
						this._buildStyler();
				}
				onStart(t) {
					this._onStartFns.push(t);
				}
				onDone(t) {
					this._onDoneFns.push(t);
				}
				onDestroy(t) {
					this._onDestroyFns.push(t);
				}
				destroy() {
					this.init(),
						this._state >= 4 ||
							((this._state = 4),
							this._styler.destroy(),
							this._flushStartFns(),
							this._flushDoneFns(),
							this._specialStyles &&
								this._specialStyles.destroy(),
							this._onDestroyFns.forEach((t) => t()),
							(this._onDestroyFns = []));
				}
				_flushDoneFns() {
					this._onDoneFns.forEach((t) => t()), (this._onDoneFns = []);
				}
				_flushStartFns() {
					this._onStartFns.forEach((t) => t()),
						(this._onStartFns = []);
				}
				finish() {
					this.init(),
						this._state >= 3 ||
							((this._state = 3),
							this._styler.finish(),
							this._flushStartFns(),
							this._specialStyles && this._specialStyles.finish(),
							this._flushDoneFns());
				}
				setPosition(t) {
					this._styler.setPosition(t);
				}
				getPosition() {
					return this._styler.getPosition();
				}
				hasStarted() {
					return this._state >= 2;
				}
				init() {
					this._state >= 1 ||
						((this._state = 1),
						this._styler.apply(),
						this._delay && this._styler.pause());
				}
				play() {
					this.init(),
						this.hasStarted() ||
							(this._flushStartFns(),
							(this._state = 2),
							this._specialStyles && this._specialStyles.start()),
						this._styler.resume();
				}
				pause() {
					this.init(), this._styler.pause();
				}
				restart() {
					this.reset(), this.play();
				}
				reset() {
					this._styler.destroy(),
						this._buildStyler(),
						this._styler.apply();
				}
				_buildStyler() {
					this._styler = new Be(
						this.element,
						this.animationName,
						this._duration,
						this._delay,
						this.easing,
						'forwards',
						() => this.finish()
					);
				}
				triggerCallback(t) {
					const e = 'start' == t ? this._onStartFns : this._onDoneFns;
					e.forEach((t) => t()), (e.length = 0);
				}
				beforeDestroy() {
					this.init();
					const t = {};
					if (this.hasStarted()) {
						const e = this._state >= 3;
						Object.keys(this._finalStyles).forEach((n) => {
							'offset' != n &&
								(t[n] = e
									? this._finalStyles[n]
									: Ft(this.element, n));
						});
					}
					this.currentSnapshot = t;
				}
			}
			class Ye extends z {
				constructor(t, e) {
					super(),
						(this.element = t),
						(this._startingStyles = {}),
						(this.__initialized = !1),
						(this._styles = lt(e));
				}
				init() {
					!this.__initialized &&
						this._startingStyles &&
						((this.__initialized = !0),
						Object.keys(this._styles).forEach((t) => {
							this._startingStyles[t] = this.element.style[t];
						}),
						super.init());
				}
				play() {
					this._startingStyles &&
						(this.init(),
						Object.keys(this._styles).forEach((t) =>
							this.element.style.setProperty(t, this._styles[t])
						),
						super.play());
				}
				destroy() {
					this._startingStyles &&
						(Object.keys(this._startingStyles).forEach((t) => {
							const e = this._startingStyles[t];
							e
								? this.element.style.setProperty(t, e)
								: this.element.style.removeProperty(t);
						}),
						(this._startingStyles = null),
						super.destroy());
				}
			}
			class tn {
				constructor() {
					(this._count = 0),
						(this._head = document.querySelector('head'));
				}
				validateStyleProperty(t) {
					return st(t);
				}
				matchesElement(t, e) {
					return it(t, e);
				}
				containsElement(t, e) {
					return ot(t, e);
				}
				query(t, e, n) {
					return at(t, e, n);
				}
				computeStyle(t, e, n) {
					return window.getComputedStyle(t)[e];
				}
				buildKeyframeElement(t, e, n) {
					n = n.map((t) => lt(t));
					let r = `@keyframes ${e} {\n`,
						s = '';
					n.forEach((t) => {
						s = ' ';
						const e = parseFloat(t.offset);
						(r += `${s}${100 * e}% {\n`),
							(s += ' '),
							Object.keys(t).forEach((e) => {
								const n = t[e];
								switch (e) {
									case 'offset':
										return;
									case 'easing':
										return void (
											n &&
											(r += `${s}animation-timing-function: ${n};\n`)
										);
									default:
										return void (r += `${s}${e}: ${n};\n`);
								}
							}),
							(r += `${s}}\n`);
					}),
						(r += '}\n');
					const i = document.createElement('style');
					return (i.textContent = r), i;
				}
				animate(t, e, n, r, s, i = [], o) {
					const a = i.filter((t) => t instanceof Xe),
						l = {};
					Pt(n, r) &&
						a.forEach((t) => {
							let e = t.currentSnapshot;
							Object.keys(e).forEach((t) => (l[t] = e[t]));
						});
					const c = (function (t) {
						let e = {};
						return (
							t &&
								(Array.isArray(t) ? t : [t]).forEach((t) => {
									Object.keys(t).forEach((n) => {
										'offset' != n &&
											'easing' != n &&
											(e[n] = t[n]);
									});
								}),
							e
						);
					})((e = Nt(t, e, l)));
					if (0 == n) return new Ye(t, c);
					const u = 'gen_css_kf_' + this._count++,
						h = this.buildKeyframeElement(t, u, e);
					document.querySelector('head').appendChild(h);
					const d = Ue(t, e),
						f = new Xe(t, e, u, n, r, s, c, d);
					return (
						f.onDestroy(() => {
							var t;
							(t = h).parentNode.removeChild(t);
						}),
						f
					);
				}
			}
			class en {
				constructor(t, e, n, r) {
					(this.element = t),
						(this.keyframes = e),
						(this.options = n),
						(this._specialStyles = r),
						(this._onDoneFns = []),
						(this._onStartFns = []),
						(this._onDestroyFns = []),
						(this._initialized = !1),
						(this._finished = !1),
						(this._started = !1),
						(this._destroyed = !1),
						(this.time = 0),
						(this.parentPlayer = null),
						(this.currentSnapshot = {}),
						(this._duration = n.duration),
						(this._delay = n.delay || 0),
						(this.time = this._duration + this._delay);
				}
				_onFinish() {
					this._finished ||
						((this._finished = !0),
						this._onDoneFns.forEach((t) => t()),
						(this._onDoneFns = []));
				}
				init() {
					this._buildPlayer(), this._preparePlayerBeforeStart();
				}
				_buildPlayer() {
					if (this._initialized) return;
					this._initialized = !0;
					const t = this.keyframes;
					(this.domPlayer = this._triggerWebAnimation(
						this.element,
						t,
						this.options
					)),
						(this._finalKeyframe = t.length ? t[t.length - 1] : {}),
						this.domPlayer.addEventListener('finish', () =>
							this._onFinish()
						);
				}
				_preparePlayerBeforeStart() {
					this._delay
						? this._resetDomPlayerState()
						: this.domPlayer.pause();
				}
				_triggerWebAnimation(t, e, n) {
					return t.animate(e, n);
				}
				onStart(t) {
					this._onStartFns.push(t);
				}
				onDone(t) {
					this._onDoneFns.push(t);
				}
				onDestroy(t) {
					this._onDestroyFns.push(t);
				}
				play() {
					this._buildPlayer(),
						this.hasStarted() ||
							(this._onStartFns.forEach((t) => t()),
							(this._onStartFns = []),
							(this._started = !0),
							this._specialStyles && this._specialStyles.start()),
						this.domPlayer.play();
				}
				pause() {
					this.init(), this.domPlayer.pause();
				}
				finish() {
					this.init(),
						this._specialStyles && this._specialStyles.finish(),
						this._onFinish(),
						this.domPlayer.finish();
				}
				reset() {
					this._resetDomPlayerState(),
						(this._destroyed = !1),
						(this._finished = !1),
						(this._started = !1);
				}
				_resetDomPlayerState() {
					this.domPlayer && this.domPlayer.cancel();
				}
				restart() {
					this.reset(), this.play();
				}
				hasStarted() {
					return this._started;
				}
				destroy() {
					this._destroyed ||
						((this._destroyed = !0),
						this._resetDomPlayerState(),
						this._onFinish(),
						this._specialStyles && this._specialStyles.destroy(),
						this._onDestroyFns.forEach((t) => t()),
						(this._onDestroyFns = []));
				}
				setPosition(t) {
					void 0 === this.domPlayer && this.init(),
						(this.domPlayer.currentTime = t * this.time);
				}
				getPosition() {
					return this.domPlayer.currentTime / this.time;
				}
				get totalTime() {
					return this._delay + this._duration;
				}
				beforeDestroy() {
					const t = {};
					this.hasStarted() &&
						Object.keys(this._finalKeyframe).forEach((e) => {
							'offset' != e &&
								(t[e] = this._finished
									? this._finalKeyframe[e]
									: Ft(this.element, e));
						}),
						(this.currentSnapshot = t);
				}
				triggerCallback(t) {
					const e = 'start' == t ? this._onStartFns : this._onDoneFns;
					e.forEach((t) => t()), (e.length = 0);
				}
			}
			class nn {
				constructor() {
					(this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
						rn().toString()
					)),
						(this._cssKeyframesDriver = new tn());
				}
				validateStyleProperty(t) {
					return st(t);
				}
				matchesElement(t, e) {
					return it(t, e);
				}
				containsElement(t, e) {
					return ot(t, e);
				}
				query(t, e, n) {
					return at(t, e, n);
				}
				computeStyle(t, e, n) {
					return window.getComputedStyle(t)[e];
				}
				overrideWebAnimationsSupport(t) {
					this._isNativeImpl = t;
				}
				animate(t, e, n, r, s, i = [], o) {
					if (!o && !this._isNativeImpl)
						return this._cssKeyframesDriver.animate(
							t,
							e,
							n,
							r,
							s,
							i
						);
					const a = {
						duration: n,
						delay: r,
						fill: 0 == r ? 'both' : 'forwards'
					};
					s && (a.easing = s);
					const l = {},
						c = i.filter((t) => t instanceof en);
					Pt(n, r) &&
						c.forEach((t) => {
							let e = t.currentSnapshot;
							Object.keys(e).forEach((t) => (l[t] = e[t]));
						});
					const u = Ue(
						t,
						(e = Nt(t, (e = e.map((t) => wt(t, !1))), l))
					);
					return new en(t, e, a, u);
				}
			}
			function rn() {
				return (
					('undefined' != typeof window &&
						void 0 !== window.document &&
						Element.prototype.animate) ||
					{}
				);
			}
			let sn = (() => {
				class t extends L {
					constructor(t, e) {
						super(),
							(this._nextAnimationId = 0),
							(this._renderer = t.createRenderer(e.body, {
								id: '0',
								encapsulation: s.Q.None,
								styles: [],
								data: { animation: [] }
							}));
					}
					build(t) {
						const e = this._nextAnimationId.toString();
						this._nextAnimationId++;
						const n = Array.isArray(t) ? U(t) : t;
						return (
							ln(this._renderer, null, e, 'register', [n]),
							new on(e, this._renderer)
						);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(s.Ib(s.F), s.Ib(r.c));
					}),
					(t.ɵprov = s.zb({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			class on extends class {} {
				constructor(t, e) {
					super(), (this._id = t), (this._renderer = e);
				}
				create(t, e) {
					return new an(this._id, t, e || {}, this._renderer);
				}
			}
			class an {
				constructor(t, e, n, r) {
					(this.id = t),
						(this.element = e),
						(this._renderer = r),
						(this.parentPlayer = null),
						(this._started = !1),
						(this.totalTime = 0),
						this._command('create', n);
				}
				_listen(t, e) {
					return this._renderer.listen(
						this.element,
						`@@${this.id}:${t}`,
						e
					);
				}
				_command(t, ...e) {
					return ln(this._renderer, this.element, this.id, t, e);
				}
				onDone(t) {
					this._listen('done', t);
				}
				onStart(t) {
					this._listen('start', t);
				}
				onDestroy(t) {
					this._listen('destroy', t);
				}
				init() {
					this._command('init');
				}
				hasStarted() {
					return this._started;
				}
				play() {
					this._command('play'), (this._started = !0);
				}
				pause() {
					this._command('pause');
				}
				restart() {
					this._command('restart');
				}
				finish() {
					this._command('finish');
				}
				destroy() {
					this._command('destroy');
				}
				reset() {
					this._command('reset');
				}
				setPosition(t) {
					this._command('setPosition', t);
				}
				getPosition() {
					var t, e;
					return null !==
						(e =
							null ===
								(t = this._renderer.engine.players[+this.id]) ||
							void 0 === t
								? void 0
								: t.getPosition()) && void 0 !== e
						? e
						: 0;
				}
			}
			function ln(t, e, n, r, s) {
				return t.setProperty(e, `@@${n}:${r}`, s);
			}
			const cn = '@',
				un = '@.disabled';
			let hn = (() => {
				class t {
					constructor(t, e, n) {
						(this.delegate = t),
							(this.engine = e),
							(this._zone = n),
							(this._currentId = 0),
							(this._microtaskId = 1),
							(this._animationCallbacksBuffer = []),
							(this._rendererCache = new Map()),
							(this._cdRecurDepth = 0),
							(this.promise = Promise.resolve(0)),
							(e.onRemovalComplete = (t, e) => {
								e &&
									e.parentNode(t) &&
									e.removeChild(t.parentNode, t);
							});
					}
					createRenderer(t, e) {
						const n = this.delegate.createRenderer(t, e);
						if (!(t && e && e.data && e.data.animation)) {
							let t = this._rendererCache.get(n);
							return (
								t ||
									((t = new dn('', n, this.engine)),
									this._rendererCache.set(n, t)),
								t
							);
						}
						const r = e.id,
							s = e.id + '-' + this._currentId;
						this._currentId++, this.engine.register(s, t);
						const i = (e) => {
							Array.isArray(e)
								? e.forEach(i)
								: this.engine.registerTrigger(
										r,
										s,
										t,
										e.name,
										e
								  );
						};
						return (
							e.data.animation.forEach(i),
							new fn(this, s, n, this.engine)
						);
					}
					begin() {
						this._cdRecurDepth++,
							this.delegate.begin && this.delegate.begin();
					}
					_scheduleCountTask() {
						this.promise.then(() => {
							this._microtaskId++;
						});
					}
					scheduleListenerCallback(t, e, n) {
						t >= 0 && t < this._microtaskId
							? this._zone.run(() => e(n))
							: (0 == this._animationCallbacksBuffer.length &&
									Promise.resolve(null).then(() => {
										this._zone.run(() => {
											this._animationCallbacksBuffer.forEach(
												(t) => {
													const [e, n] = t;
													e(n);
												}
											),
												(this._animationCallbacksBuffer = []);
										});
									}),
							  this._animationCallbacksBuffer.push([e, n]));
					}
					end() {
						this._cdRecurDepth--,
							0 == this._cdRecurDepth &&
								this._zone.runOutsideAngular(() => {
									this._scheduleCountTask(),
										this.engine.flush(this._microtaskId);
								}),
							this.delegate.end && this.delegate.end();
					}
					whenRenderingDone() {
						return this.engine.whenRenderingDone();
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(s.Ib(s.F), s.Ib(Me), s.Ib(s.A));
					}),
					(t.ɵprov = s.zb({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			class dn {
				constructor(t, e, n) {
					(this.namespaceId = t),
						(this.delegate = e),
						(this.engine = n),
						(this.destroyNode = this.delegate.destroyNode
							? (t) => e.destroyNode(t)
							: null);
				}
				get data() {
					return this.delegate.data;
				}
				destroy() {
					this.engine.destroy(this.namespaceId, this.delegate),
						this.delegate.destroy();
				}
				createElement(t, e) {
					return this.delegate.createElement(t, e);
				}
				createComment(t) {
					return this.delegate.createComment(t);
				}
				createText(t) {
					return this.delegate.createText(t);
				}
				appendChild(t, e) {
					this.delegate.appendChild(t, e),
						this.engine.onInsert(this.namespaceId, e, t, !1);
				}
				insertBefore(t, e, n, r = !0) {
					this.delegate.insertBefore(t, e, n),
						this.engine.onInsert(this.namespaceId, e, t, r);
				}
				removeChild(t, e, n) {
					this.engine.onRemove(this.namespaceId, e, this.delegate, n);
				}
				selectRootElement(t, e) {
					return this.delegate.selectRootElement(t, e);
				}
				parentNode(t) {
					return this.delegate.parentNode(t);
				}
				nextSibling(t) {
					return this.delegate.nextSibling(t);
				}
				setAttribute(t, e, n, r) {
					this.delegate.setAttribute(t, e, n, r);
				}
				removeAttribute(t, e, n) {
					this.delegate.removeAttribute(t, e, n);
				}
				addClass(t, e) {
					this.delegate.addClass(t, e);
				}
				removeClass(t, e) {
					this.delegate.removeClass(t, e);
				}
				setStyle(t, e, n, r) {
					this.delegate.setStyle(t, e, n, r);
				}
				removeStyle(t, e, n) {
					this.delegate.removeStyle(t, e, n);
				}
				setProperty(t, e, n) {
					e.charAt(0) == cn && e == un
						? this.disableAnimations(t, !!n)
						: this.delegate.setProperty(t, e, n);
				}
				setValue(t, e) {
					this.delegate.setValue(t, e);
				}
				listen(t, e, n) {
					return this.delegate.listen(t, e, n);
				}
				disableAnimations(t, e) {
					this.engine.disableAnimations(t, e);
				}
			}
			class fn extends dn {
				constructor(t, e, n, r) {
					super(e, n, r), (this.factory = t), (this.namespaceId = e);
				}
				setProperty(t, e, n) {
					e.charAt(0) == cn
						? '.' == e.charAt(1) && e == un
							? this.disableAnimations(
									t,
									(n = void 0 === n || !!n)
							  )
							: this.engine.process(
									this.namespaceId,
									t,
									e.substr(1),
									n
							  )
						: this.delegate.setProperty(t, e, n);
				}
				listen(t, e, n) {
					if (e.charAt(0) == cn) {
						const r = (function (t) {
							switch (t) {
								case 'body':
									return document.body;
								case 'document':
									return document;
								case 'window':
									return window;
								default:
									return t;
							}
						})(t);
						let s = e.substr(1),
							i = '';
						return (
							s.charAt(0) != cn &&
								([s, i] = (function (t) {
									const e = t.indexOf('.');
									return [t.substring(0, e), t.substr(e + 1)];
								})(s)),
							this.engine.listen(
								this.namespaceId,
								r,
								s,
								i,
								(t) => {
									this.factory.scheduleListenerCallback(
										t._data || -1,
										n,
										t
									);
								}
							)
						);
					}
					return this.delegate.listen(t, e, n);
				}
			}
			let pn = (() => {
				class t extends Me {
					constructor(t, e, n) {
						super(t.body, e, n);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(s.Ib(r.c), s.Ib(ut), s.Ib(oe));
					}),
					(t.ɵprov = s.zb({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const mn = [
				{
					provide: ut,
					useFactory: function () {
						return 'function' == typeof rn() ? new nn() : new tn();
					}
				},
				{
					provide: new s.r('AnimationModuleType'),
					useValue: 'BrowserAnimations'
				},
				{ provide: L, useClass: sn },
				{
					provide: oe,
					useFactory: function () {
						return new ae();
					}
				},
				{ provide: Me, useClass: pn },
				{
					provide: s.F,
					useFactory: function (t, e, n) {
						return new hn(t, e, n);
					},
					deps: [w, Me, s.A]
				}
			];
			let gn = (() => {
				class t {}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵmod = s.Bb({ type: t })),
					(t.ɵinj = s.Ab({ providers: mn, imports: [N] })),
					t
				);
			})();
			const yn = [
				{ path: '', redirectTo: '/home', pathMatch: 'full' },
				{
					path: 'home',
					loadChildren: () =>
						n
							.e(4)
							.then(n.bind(null, '99Un'))
							.then((t) => t.HomeModule)
				}
			];
			let _n = (() => {
					class t {}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵmod = s.Bb({ type: t })),
						(t.ɵinj = s.Ab({ imports: [[D.a.forRoot(yn)], D.a] })),
						t
					);
				})(),
				bn = (() => {
					class t {}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵmod = s.Bb({ type: t, bootstrap: [F] })),
						(t.ɵinj = s.Ab({
							providers: [],
							imports: [[N, gn, _n]]
						})),
						t
					);
				})();
			Object(s.S)(),
				R()
					.bootstrapModule(bn)
					.catch((t) => console.error(t));
		},
		zn8P: function (t, e) {
			function n(t) {
				return Promise.resolve().then(function () {
					var e = new Error("Cannot find module '" + t + "'");
					throw ((e.code = 'MODULE_NOT_FOUND'), e);
				});
			}
			(n.keys = function () {
				return [];
			}),
				(n.resolve = n),
				(t.exports = n),
				(n.id = 'zn8P');
		},
		zx2A: function (t, e, n) {
			'use strict';
			n.d(e, 'a', function () {
				return o;
			}),
				n.d(e, 'b', function () {
					return a;
				}),
				n.d(e, 'c', function () {
					return l;
				});
			var r = n('7o/Q'),
				s = n('HDdC'),
				i = n('SeVD');
			class o extends r.a {
				constructor(t) {
					super(), (this.parent = t);
				}
				_next(t) {
					this.parent.notifyNext(t);
				}
				_error(t) {
					this.parent.notifyError(t), this.unsubscribe();
				}
				_complete() {
					this.parent.notifyComplete(), this.unsubscribe();
				}
			}
			class a extends r.a {
				notifyNext(t) {
					this.destination.next(t);
				}
				notifyError(t) {
					this.destination.error(t);
				}
				notifyComplete() {
					this.destination.complete();
				}
			}
			function l(t, e) {
				if (e.closed) return;
				if (t instanceof s.a) return t.subscribe(e);
				let n;
				try {
					n = Object(i.a)(t)(e);
				} catch (r) {
					e.error(r);
				}
				return n;
			}
		}
	},
	[[0, 0]]
]);
