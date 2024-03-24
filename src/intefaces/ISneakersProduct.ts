import type ISneakersItem from '@/intefaces/ISneakersItem'

export default interface ISneakersProduct extends ISneakersItem {
    isFavorite: boolean,
    isAdded: boolean
}