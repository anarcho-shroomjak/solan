import {Side, SideType} from "../pages/MaterialsPage.tsx";

export default class SpecsService {
  totalArea(sides: Side[][]) {
    const totalArr = sides.map(e => {
      const sides = e.map(el => el.length) as number[]
      const halfArea = sides.reduce((p, n) => p+n) / 2
      return Math.sqrt(halfArea * (halfArea - sides[0]) * (halfArea - sides[1]) * (halfArea - sides[2]))
    })

    return totalArr.reduce((a, b) => a + b)
  }

  totalMaterials(sides: Side[][]) {
    let mats = {}

    sides.flat().forEach(e => { // @ts-ignore
      mats[e.type || SideType.Krisha] = (mats[e.type] || 0) + e.length })
    return mats
  }
}