import { defaultToString } from '../util'
import { ValuePair } from './models/value-pair'

export default class Dictionary<K, V> {
    private table: { [key: string]: ValuePair<K, V> }

    constructor(private toStrFn: (key: K) => string = defaultToString) {
        this.table = {}
    }

    set(key: K, value: V) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key)
            this.table[tableKey] = new ValuePair(key, value)
            return true
        }
        return false
    }

    get(key: K): V {
        const valuePair = this.table[this.toStrFn(key)]
        return valuePair == null ? undefined : valuePair.value
    }

    hasKey(key: K) {
        return this.table[this.toStrFn(key)] != null
    }

    remove(key: K) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)]
            return true
        }
        return false
    }

    values(): V[] {
        return this.keyValues().map(
            (valuePair: ValuePair<K, V>) => valuePair.value
        )
    }

    keys(): K[] {
        return this.keyValues().map(
            (valuePair: ValuePair<K, V>) => valuePair.key
        )
    }

    keyValues(): ValuePair<K, V>[] {
        const valuePairs = []
        for (let index in this.table) {
            valuePairs.push(this.table[index])
        }
        return valuePairs
        // return Object.values(this.table) // ES2017写法
    }

    forEach(callbackFn: (key: K, value: V) => any) {
        const valuePairs = this.keyValues()
        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value)
            if (result === false) {
                break
            }
        }
    }

    isEmpty(): boolean {
        return this.size() === 0
    }

    size(): number {
        return Object.keys(this.table).length
    }

    clear() {
        this.table = {}
    }

    toString(): string {
        if (this.isEmpty()) {
            return ''
        }
        const valuePairs = this.keyValues()
        let objString = `${valuePairs[0].toString()}`
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString}, ${valuePairs[i].toString()}`
        }
        return objString
    }
}

// test
// const dict = new Dictionary()
// dict.set(1, 'tom')
// dict.set(2, 'jerry')
// dict.set(3, 'lucy')
// console.log(dict.keyValues())
