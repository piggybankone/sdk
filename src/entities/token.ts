import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
  [ChainId.BSCTESTNET]: new Token(
    ChainId.BSCTESTNET,
    '0xaE8E19eFB41e7b96815649A6a60785e1fbA84C1e',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
  [ChainId.FANTOMNET]: new Token(
    ChainId.FANTOMNET,
    '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
    18,
    'wFTM',
    'Wrapped Fantom'
  ),
  [ChainId.FANTOMTESTNET]: new Token(
    ChainId.FANTOMTESTNET,
    '0xf1277d1ed8ad466beddf92ef448a132661956621',
    18,
    'wFTM',
    'Wrapped Fantom'
  ),
  [ChainId.HARMONYNET]: new Token(
    ChainId.HARMONYNET,
    '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
    18,
    'WONE',
    'Wrapped ONE'
  ),
  [ChainId.HARMONYTESTNET]: new Token(
    ChainId.HARMONYTESTNET,
    '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
    18,
    'WONE',
    'Wrapped ONE'
  ),
}
