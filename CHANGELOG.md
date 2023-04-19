# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.44](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.43...v0.2.44) (2023-04-19)


### Bug Fixes

* **item:** parsing for items simplified and populates as much as possible per item ([#97](https://github.com/EthanJWright/foundryvtt-importer/issues/97)) ([2ad20a4](https://github.com/EthanJWright/foundryvtt-importer/commit/2ad20a41fe47ef97941ba3d78702c600f927224b))

### [0.2.43](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.42...v0.2.43) (2023-04-15)


### Bug Fixes

* **item:** range parsing now cascades ([#94](https://github.com/EthanJWright/foundryvtt-importer/issues/94)) ([270bd7c](https://github.com/EthanJWright/foundryvtt-importer/commit/270bd7c59679b27a23cf3854d63ebbccb4a941c5))

### [0.2.42](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.41...v0.2.42) (2023-04-09)


### Bug Fixes

* **actor:** several parsing assumptions ([#91](https://github.com/EthanJWright/foundryvtt-importer/issues/91)) ([b75d543](https://github.com/EthanJWright/foundryvtt-importer/commit/b75d543e57b276fdb18ba7fe5f965209dff27ffd))

### [0.2.41](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.40...v0.2.41) (2023-04-07)


### Features

* **actor:** treat ac as armor class when parsing  ([#89](https://github.com/EthanJWright/foundryvtt-importer/issues/89)) ([04b8d21](https://github.com/EthanJWright/foundryvtt-importer/commit/04b8d21024d4e3eeb762a15c6572442affc0f312))

### [0.2.40](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.39...v0.2.40) (2023-02-19)


### Bug Fixes

* **actor:** ability parsing patches ([#86](https://github.com/EthanJWright/foundryvtt-importer/issues/86)) ([5bb6097](https://github.com/EthanJWright/foundryvtt-importer/commit/5bb6097443aff1ae0970e6e2180d360136682fa4))

### [0.2.39](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.38...v0.2.39) (2023-02-19)


### Bug Fixes

* **actor:** parse key value mod style abilities ([#85](https://github.com/EthanJWright/foundryvtt-importer/issues/85)) ([52d9fab](https://github.com/EthanJWright/foundryvtt-importer/commit/52d9fab76eb2f0143837ead644fb5c3bc3fabf84)), closes [#83](https://github.com/EthanJWright/foundryvtt-importer/issues/83)

### [0.2.38](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.37...v0.2.38) (2023-02-01)


### Bug Fixes

* **actor:** iss-81 allow AC and Health to have diff casing ([#82](https://github.com/EthanJWright/foundryvtt-importer/issues/82)) ([924b024](https://github.com/EthanJWright/foundryvtt-importer/commit/924b024999297903820d6159e767e59de665c219))

### [0.2.37](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.36...v0.2.37) (2022-12-09)


### Bug Fixes

* **actor:** health parsing for gpt ([#79](https://github.com/EthanJWright/foundryvtt-importer/issues/79)) ([d79f6a0](https://github.com/EthanJWright/foundryvtt-importer/commit/d79f6a025c9a6ec2a7d65d5116f624cd699404a5))

### [0.2.36](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.35...v0.2.36) (2022-12-07)


### Features

* **actor:** chatgpt stat support ([#77](https://github.com/EthanJWright/foundryvtt-importer/issues/77)) ([e7ead4a](https://github.com/EthanJWright/foundryvtt-importer/commit/e7ead4a5b184fdd89bce19a1d90b0ec48cf679c3))

### [0.2.35](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.34...v0.2.35) (2022-11-30)


### Bug Fixes

* **actor:** processing names with ! that end with . ([#76](https://github.com/EthanJWright/foundryvtt-importer/issues/76)) ([5d0b554](https://github.com/EthanJWright/foundryvtt-importer/commit/5d0b55449603e79c74215e5243b0931f5e8ce5e3))

### [0.2.34](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.33...v0.2.34) (2022-11-30)


### Bug Fixes

* **actor:** add mcdm changing parsing ([#75](https://github.com/EthanJWright/foundryvtt-importer/issues/75)) ([db78bc4](https://github.com/EthanJWright/foundryvtt-importer/commit/db78bc42818f84852cd70fde791c90927cfb3db4))

### [0.2.33](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.32...v0.2.33) (2022-11-30)


### Bug Fixes

* **actor:** tweak name parsing ([#74](https://github.com/EthanJWright/foundryvtt-importer/issues/74)) ([8e3b109](https://github.com/EthanJWright/foundryvtt-importer/commit/8e3b109c655036b3cbd58f6e2d58ebf929d732b4))

### [0.2.32](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.31...v0.2.32) (2022-11-28)


### Bug Fixes

* **actor:** tweak feature parsing ([#73](https://github.com/EthanJWright/foundryvtt-importer/issues/73)) ([c87689f](https://github.com/EthanJWright/foundryvtt-importer/commit/c87689fd42753dbfe2b1f013331bba0772f8b007))

### [0.2.31](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.30...v0.2.31) (2022-11-28)


### Bug Fixes

* **actor:** Villain actions are placed in feature and formatted ([#72](https://github.com/EthanJWright/foundryvtt-importer/issues/72)) ([2f66af2](https://github.com/EthanJWright/foundryvtt-importer/commit/2f66af20b7c72c758354db3498e1033497e158bc))

### [0.2.30](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.29...v0.2.30) (2022-11-28)


### Bug Fixes

* **item:** default attempt feature parse ([#71](https://github.com/EthanJWright/foundryvtt-importer/issues/71)) ([c7bb36b](https://github.com/EthanJWright/foundryvtt-importer/commit/c7bb36b5f3dbcc168e48f60ce65a6cec14364868))

### [0.2.29](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.28...v0.2.29) (2022-11-27)

### [0.2.28](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.27...v0.2.28) (2022-09-12)


### Bug Fixes

* **module.json:** versions and updates for foundry v10 ([#66](https://github.com/EthanJWright/foundryvtt-importer/issues/66)) ([02e4dcf](https://github.com/EthanJWright/foundryvtt-importer/commit/02e4dcf5cf4faf090aa1a5529478f73fe620d7e9))

### [0.2.27](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.26...v0.2.27) (2022-09-11)

### [0.2.26](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.25...v0.2.26) (2022-08-29)


### Bug Fixes

* **module:** add url so link exists in foundry ([#64](https://github.com/EthanJWright/foundryvtt-importer/issues/64)) ([7023024](https://github.com/EthanJWright/foundryvtt-importer/commit/70230242334788a9a8f745d78a59821b872cc25f))

### [0.2.25](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.24...v0.2.25) (2022-08-18)


### Bug Fixes

* **table:** DNDBeyond format and edge cases ([#61](https://github.com/EthanJWright/foundryvtt-importer/issues/61)) ([7e8a30a](https://github.com/EthanJWright/foundryvtt-importer/commit/7e8a30a981279a74546422f476f84936f384e626))

### [0.2.24](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.23...v0.2.24) (2022-08-18)


### Features

* **tables:** support 5e dnd roll table format ([#60](https://github.com/EthanJWright/foundryvtt-importer/issues/60)) ([9586914](https://github.com/EthanJWright/foundryvtt-importer/commit/9586914f6ab4f32785272165d1f3e75f6e93c6c5))

### [0.2.23](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.22...v0.2.23) (2022-08-10)

### [0.2.22](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.21...v0.2.22) (2022-07-02)


### Bug Fixes

* **journal:** parse on mdash as well ([#57](https://github.com/EthanJWright/foundryvtt-importer/issues/57)) ([62d42df](https://github.com/EthanJWright/foundryvtt-importer/commit/62d42dff40f200d47bd228d57d8e8c2a31608387))

### [0.2.21](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.20...v0.2.21) (2022-07-02)


### Bug Fixes

* **journal:** add character checks for titles ([#56](https://github.com/EthanJWright/foundryvtt-importer/issues/56)) ([7bf09e1](https://github.com/EthanJWright/foundryvtt-importer/commit/7bf09e126b28438f56d5027c4d2f2201c554e04d))

### [0.2.20](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.19...v0.2.20) (2022-06-18)


### Bug Fixes

* **journal:** list logic and name highlighting ([#55](https://github.com/EthanJWright/foundryvtt-importer/issues/55)) ([2426db5](https://github.com/EthanJWright/foundryvtt-importer/commit/2426db58f5a9339c9b3d3a0aad79c70587dc7952))

### [0.2.19](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.18...v0.2.19) (2022-06-18)


### Bug Fixes

* **journal:** sort order required ([#54](https://github.com/EthanJWright/foundryvtt-importer/issues/54)) ([ffcb589](https://github.com/EthanJWright/foundryvtt-importer/commit/ffcb58931202d22df73636744c6c082bc552da55))

### [0.2.18](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.17...v0.2.18) (2022-06-18)


### Bug Fixes

* **journal:** entry for ddb validation ([#53](https://github.com/EthanJWright/foundryvtt-importer/issues/53)) ([152687c](https://github.com/EthanJWright/foundryvtt-importer/commit/152687cd354861f0bbc695811394cc7a1268172d))

### [0.2.17](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.16...v0.2.17) (2022-06-18)


### Features

* **journal:** create journal entries from your clipboard ([#52](https://github.com/EthanJWright/foundryvtt-importer/issues/52)) ([e8e4d1b](https://github.com/EthanJWright/foundryvtt-importer/commit/e8e4d1b19b5584c587b631b41bafe836c7507a76))

### [0.2.16](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.15...v0.2.16) (2022-06-15)

### [0.2.15](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.14...v0.2.15) (2022-06-12)


### Bug Fixes

* **actor:** handle recharges and legendary actions ([#49](https://github.com/EthanJWright/foundryvtt-importer/issues/49)) ([50c6b1f](https://github.com/EthanJWright/foundryvtt-importer/commit/50c6b1faf6ffa2acafee7bc7a7452ae79a05c66c))

### [0.2.14](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.13...v0.2.14) (2022-06-03)

### [0.2.13](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.12...v0.2.13) (2022-05-30)

### [0.2.12](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.11...v0.2.12) (2022-05-04)


### Bug Fixes

* journal needs to be reversed after it is built ([7f3873f](https://github.com/EthanJWright/foundryvtt-importer/commit/7f3873fdedea7a7ed1d03e0d47d121bd6411a848))

### [0.2.11](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.10...v0.2.11) (2022-03-16)


### Bug Fixes

* allow for all systems, update name to indicate exclusive features ([d5ba906](https://github.com/EthanJWright/foundryvtt-importer/commit/d5ba90632c3c98706ca37c9f6de58d47511158b7))
* base weapon type off die pattern ([ae22154](https://github.com/EthanJWright/foundryvtt-importer/commit/ae2215446a16491207763adc5cdd4d7c428decdc))

### [0.2.10](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.9...v0.2.10) (2022-03-04)


### Bug Fixes

* **actor:** parsing senses with regex instead of string match ([2187413](https://github.com/EthanJWright/foundryvtt-importer/commit/21874132a68188fe1d603fb2ad638f48de0a8b6d))
* **actor:** remove unused import ([d05fe31](https://github.com/EthanJWright/foundryvtt-importer/commit/d05fe31dbec4390b44003eae16601957756f66fc))

### [0.2.9](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.8...v0.2.9) (2022-02-28)


### Bug Fixes

* moving back to old reddit table handling ([8cd9e3c](https://github.com/EthanJWright/foundryvtt-importer/commit/8cd9e3c3849e0802ad706b4ecccdba14231e46e5))

### [0.2.8](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.7...v0.2.8) (2022-02-15)


### Bug Fixes

* adding no unused for generic function ([7cd9390](https://github.com/EthanJWright/foundryvtt-importer/commit/7cd9390e216e25f7c06671e0bd5a969ecb5d3336))
* adding note to readme regarding items ([c02d07a](https://github.com/EthanJWright/foundryvtt-importer/commit/c02d07af185e8e0b649cad40d390c8f0347b3091))
* adjusting assumptions ([6292584](https://github.com/EthanJWright/foundryvtt-importer/commit/6292584b0b933fb8e9a842b0a792d574b19d53f0))
* fixing spacing issues in hbs ([d4de478](https://github.com/EthanJWright/foundryvtt-importer/commit/d4de4782a83a392e718dc84d3edb0f160c204498))
* spell parsing and adding tests ([2ea9e19](https://github.com/EthanJWright/foundryvtt-importer/commit/2ea9e1958d87720c6687c92d677411308c4d0945))
* treat spells as feats for now ([5057cda](https://github.com/EthanJWright/foundryvtt-importer/commit/5057cdae5fcd5c511f6e93319e602385c876977f))
* updating mocks ([7acf209](https://github.com/EthanJWright/foundryvtt-importer/commit/7acf2091ebf706cbc59fa49f1dd1e930189ad93b))

### [0.2.7](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.6...v0.2.7) (2022-02-09)


### Features

* adding type examples for all parser methods ([91fb911](https://github.com/EthanJWright/foundryvtt-importer/commit/91fb911ad8ab11cab064fca82eae960cb2eec2c6))


### Bug Fixes

* ac throws on error, adding test ([881c46d](https://github.com/EthanJWright/foundryvtt-importer/commit/881c46d5325c4efcf39fde796dd2b23779fdc4f9))
* actually throwing for health ([66270c1](https://github.com/EthanJWright/foundryvtt-importer/commit/66270c13d0425f1839c29326e544d028e97bc61f))
* add error throwing to type extraction ([3f09396](https://github.com/EthanJWright/foundryvtt-importer/commit/3f0939651872427b9405bab6b8ab2e140d7b1756))
* add parser tests ([4da7550](https://github.com/EthanJWright/foundryvtt-importer/commit/4da755088236be6ea0838ae7fbf53f0d60159057))
* add tests for name ([bc3ad65](https://github.com/EthanJWright/foundryvtt-importer/commit/bc3ad6533f5b29c1db2e8f5faa71871d6f1529bc))
* adding language throw and tests ([64ce84c](https://github.com/EthanJWright/foundryvtt-importer/commit/64ce84c29b14da23b980fae7b178f24220a3dc86))
* adding speed test ([421e4a2](https://github.com/EthanJWright/foundryvtt-importer/commit/421e4a24358cbf06b1c3bc3abc3d31f598eba077))
* adding tests for parseFeatures and throwing when invalid ([55e23e6](https://github.com/EthanJWright/foundryvtt-importer/commit/55e23e6c34a2b227452f20740c62150af4a97461))
* adjusting build issues ([07895a0](https://github.com/EthanJWright/foundryvtt-importer/commit/07895a098ae49ecea83a921cc4f16d82bd351527))
* biography not required, adding tests ([244354f](https://github.com/EthanJWright/foundryvtt-importer/commit/244354fc8c50ec8cefe6217bb75c4e2976971326))
* damage resistances tested and new pattern followed ([7e01f5a](https://github.com/EthanJWright/foundryvtt-importer/commit/7e01f5ab7a819c5a389df692b08230772e03124a))
* ensuring health throws when passed invalid data ([8da0b7b](https://github.com/EthanJWright/foundryvtt-importer/commit/8da0b7b29108868011ea6192c4cae22db2a3978a))
* first use of tryParsers implemented ([ad589a5](https://github.com/EthanJWright/foundryvtt-importer/commit/ad589a55dde7219859d92244863768d423ce6c4a))
* fixing references and moving convert ([b09ba85](https://github.com/EthanJWright/foundryvtt-importer/commit/b09ba85995c035ab4d77189b5d9c9c4763b6fce2))
* handle commas in XP ([75e5b52](https://github.com/EthanJWright/foundryvtt-importer/commit/75e5b521000521e35c147daa63ac18605f725c22))
* patching bugs in vertical parse, adding tests ([19b3390](https://github.com/EthanJWright/foundryvtt-importer/commit/19b33905ca64bbd1e0fc161ba6727f048538fe01))
* referencing new path ([f7530db](https://github.com/EthanJWright/foundryvtt-importer/commit/f7530db2bca710e40688e08a563db782cd546732))
* removing old file ([f4d59be](https://github.com/EthanJWright/foundryvtt-importer/commit/f4d59be8de3858bc3303e69c3e06277ac853ea9e))
* size throws, add tests ([46818df](https://github.com/EthanJWright/foundryvtt-importer/commit/46818dfaf96216692ee34aa7494ad19c43c307ff))
* test senses and add throw ([06b4e87](https://github.com/EthanJWright/foundryvtt-importer/commit/06b4e8718449dd6518fa67f7f12ea41d90c7b549))
* tested and fixed damage immunity parser ([3a346f6](https://github.com/EthanJWright/foundryvtt-importer/commit/3a346f6c7744ed2f7d7c5db08c1f3a7e69f8e78f))
* wrapping types with arrays in container type ([4bbf033](https://github.com/EthanJWright/foundryvtt-importer/commit/4bbf03346f5a744386389a8eb464c70ff304f5d4))

### [0.2.6](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.5...v0.2.6) (2022-02-05)


### Bug Fixes

* adding blinded to condition list ([d6ac945](https://github.com/EthanJWright/foundryvtt-importer/commit/d6ac9457765eabcebf119e478be14aff19a1cb37))
* parse all conditions ([4dac096](https://github.com/EthanJWright/foundryvtt-importer/commit/4dac096240c5631b6eeee603a18dc33587719944))
* parsing and testing special sense ([a9e6703](https://github.com/EthanJWright/foundryvtt-importer/commit/a9e670324be9041183434d141089645d2b9e3eb2))
* preload file based on CONSTANTS ([b4d123e](https://github.com/EthanJWright/foundryvtt-importer/commit/b4d123ee66efd4b215fc2b9f89b3215723cfde74))
* refactor all conditions to use aggregate parser ([1a56bf4](https://github.com/EthanJWright/foundryvtt-importer/commit/1a56bf415398dbed938326f686a187b9ebd1497a))
* removing extra logs ([bf73ab8](https://github.com/EthanJWright/foundryvtt-importer/commit/bf73ab880abfa25db4deb2ead87d19808cdf3ebc))
* sense parsing when there is special info ([99c0fc0](https://github.com/EthanJWright/foundryvtt-importer/commit/99c0fc05f165753655041c2c9d6c87e8648071ee))
* stat parsing handles multiple - chars ([d968075](https://github.com/EthanJWright/foundryvtt-importer/commit/d968075decdc4232327ad2676a1597bf6abda479))

### [0.2.5](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.4...v0.2.5) (2022-02-05)


### Features

* add item rarity parsing ([e95dbda](https://github.com/EthanJWright/foundryvtt-importer/commit/e95dbdac78718b8e3a4b6a1ad95cf82e9bb2d599))
* adding basic item parsing ([176ac7d](https://github.com/EthanJWright/foundryvtt-importer/commit/176ac7d209228dff049312a27e3cce4c1ad7fb29))
* adding config button for an item importer ([9cbeddd](https://github.com/EthanJWright/foundryvtt-importer/commit/9cbeddd31814e781653df1d019a6255929b23ed0))


### Bug Fixes

* better type parsing ([0189606](https://github.com/EthanJWright/foundryvtt-importer/commit/01896062b7b142735555efb5e1bd6622767bb2bb))
* bind ui to parser ([13db246](https://github.com/EthanJWright/foundryvtt-importer/commit/13db2464a49e480accbc702481d64edab942b63f))
* bug in parsing actor type ([5c62c7f](https://github.com/EthanJWright/foundryvtt-importer/commit/5c62c7fa28cada6150d24001ec5addc0c5f3816d))
* cleaning how description is generated ([b1d87cb](https://github.com/EthanJWright/foundryvtt-importer/commit/b1d87cbab88acd7278d22d454abc04bd2686f76d))
* hooking up weapon parsing to item parser ([729b94f](https://github.com/EthanJWright/foundryvtt-importer/commit/729b94f595c9cfdfcf2c374a54ccca8c090ec30c))
* how uses are added ([26d25bc](https://github.com/EthanJWright/foundryvtt-importer/commit/26d25bc139535ef7911f9e38d9492e501fec408b))
* removed circular deps ([75234df](https://github.com/EthanJWright/foundryvtt-importer/commit/75234df58abf744a2d9905d6fffb868f3b61bf3c))
* removing deprecated method ([ef76773](https://github.com/EthanJWright/foundryvtt-importer/commit/ef76773ad5ec9f048501d58c5ba60dc21b7276ac))
* sharing item type ([be20d5b](https://github.com/EthanJWright/foundryvtt-importer/commit/be20d5b2d9281ec328631c1c8c69a1cbdc097cd1))

### [0.2.4](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.3...v0.2.4) (2022-01-28)


### Bug Fixes

* updating constants ([98ecca1](https://github.com/EthanJWright/foundryvtt-importer/commit/98ecca1de92a736f13881c08902ef2347c4bd013))

### [0.2.3](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.2...v0.2.3) (2022-01-28)


### Bug Fixes

* quick hotfix to module name for foundry hub ([13c8309](https://github.com/EthanJWright/foundryvtt-importer/commit/13c830900cf2a91536afa7032a4202bd594ae49f))

### [0.2.2](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.2.1...v0.2.2) (2022-01-28)


### Bug Fixes

* module path breaking bug ([39402ec](https://github.com/EthanJWright/foundryvtt-importer/commit/39402ec07617f53dcf46b79a1729f8cdb89021b8))

### [0.2.1](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.1.13...v0.2.1) (2022-01-28)


### Features

* add condition immunity ([eeaf97a](https://github.com/EthanJWright/foundryvtt-importer/commit/eeaf97a4bb504068fe3846c9a3d82a5590b60b5e))
* add languages, fix bug in feature building ([96e3510](https://github.com/EthanJWright/foundryvtt-importer/commit/96e3510fe2e7c0b4d0f16a5a9337669deffca169))
* add more sophisticated item parsing ([ca75043](https://github.com/EthanJWright/foundryvtt-importer/commit/ca75043545f12dcacfca8eb2d49c7a9bd39ab50a))
* add parser for adventure league stat format ([43144f6](https://github.com/EthanJWright/foundryvtt-importer/commit/43144f68b9415913045379b55411da2c3f6d78bc))
* add parsing for multiple damage parts ([68d0fa3](https://github.com/EthanJWright/foundryvtt-importer/commit/68d0fa3126110c73dc84a22556fe91d7275cfca2))
* add size parsing ([2f480ca](https://github.com/EthanJWright/foundryvtt-importer/commit/2f480caea5a50f01430cd46be5394cd17f83eadf))
* adding alignment and type (type bug for custom) ([888f491](https://github.com/EthanJWright/foundryvtt-importer/commit/888f491e26345e27f9b3eba19f5a8bd643166da2))
* adding cone spell parsing ([c49d550](https://github.com/EthanJWright/foundryvtt-importer/commit/c49d550b3694237a9b2d920149176d2756d7b9a3))
* adding one off mappings for abnormal types, just warforged so far ([0920f11](https://github.com/EthanJWright/foundryvtt-importer/commit/0920f11112c75418df376d3abacb73613087d99a))
* adding resistance parsing ([1e514bf](https://github.com/EthanJWright/foundryvtt-importer/commit/1e514bff7d32b9c0b388eebca565d806e43a0e85))
* extract senses from text ([eaf5a5e](https://github.com/EthanJWright/foundryvtt-importer/commit/eaf5a5e70518cab919f9ae3ad418ede3fdca1257))
* handle ability scores ([9765234](https://github.com/EthanJWright/foundryvtt-importer/commit/9765234ceb9ab1ec6528d21c5f668b358a29d4cd))
* parse out damage immunities ([8a1eb93](https://github.com/EthanJWright/foundryvtt-importer/commit/8a1eb93b9beee153fd7d5aa1e80ad2463a1bd692))


### Bug Fixes

* add item parsing file ([1b91cae](https://github.com/EthanJWright/foundryvtt-importer/commit/1b91caee0cb0f1850def42d37de07cb10d0ac0ef))
* adding damage vulnerability ([d41aee5](https://github.com/EthanJWright/foundryvtt-importer/commit/d41aee55c9aae8204eaa1da41724e6568e3bf9d9))
* adding import for test ([4916c9c](https://github.com/EthanJWright/foundryvtt-importer/commit/4916c9c19c581aa90abcfd309dc523ad528e8e8c))
* adding in high level adventure parse test ([7dbf9bc](https://github.com/EthanJWright/foundryvtt-importer/commit/7dbf9bc1f99203aac2bc191644713c23999323dc))
* bug parsing when parens in name ([09d8964](https://github.com/EthanJWright/foundryvtt-importer/commit/09d8964733290ced89bcdf8bd87f933514581689))
* dropping empty strings from conditions ([bd4a444](https://github.com/EthanJWright/foundryvtt-importer/commit/bd4a444b04cb3c75baf41b7391fdb49fb092efce))
* plug in resistances ([75db979](https://github.com/EthanJWright/foundryvtt-importer/commit/75db979e140bbc42e6679060c2b2d13375516159))
* refactor to pull item parsing into its own dir ([25bde97](https://github.com/EthanJWright/foundryvtt-importer/commit/25bde97c436d4f856bf07de37e62c1648f4f0ca5))
* skill inclusion in stats ([49f12e8](https://github.com/EthanJWright/foundryvtt-importer/commit/49f12e833954d0b43267352578d0a6aaadb1b04f))
* skills was moved to wrong place ([f1fffd4](https://github.com/EthanJWright/foundryvtt-importer/commit/f1fffd419252491d8e3f89d4581b935517c78776))

### [0.1.13](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.1.12...v0.1.13) (2022-01-26)


### Bug Fixes

* adding 5e system to package.json ([e7d108c](https://github.com/EthanJWright/foundryvtt-importer/commit/e7d108c0a1c093738940afa68e702e2081f50cd0))
* fixing stat parsing discovered with user data ([45c5d79](https://github.com/EthanJWright/foundryvtt-importer/commit/45c5d7905f50df2d3e57305079c541ef66706489))

### [0.1.12](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.1.11...v0.1.12) (2022-01-24)


### Features

* adding actor demo ([de0214d](https://github.com/EthanJWright/foundryvtt-importer/commit/de0214d094ca664864be71f4e6fb91d39993d80f))


### Bug Fixes

* adding versionrc ([94ef3fb](https://github.com/EthanJWright/foundryvtt-importer/commit/94ef3fbdddabe6015c395639ec586cf02fff5f3b))
* bumping lock ([a3001e2](https://github.com/EthanJWright/foundryvtt-importer/commit/a3001e22d8a76e66e690fe91ee6e26f3a3028dcc))
* update docs ([83e71cd](https://github.com/EthanJWright/foundryvtt-importer/commit/83e71cd6cfe7f36a0eabe088708bd6bc8a49ca71))
* updating actor form for clarity ([fdb4a01](https://github.com/EthanJWright/foundryvtt-importer/commit/fdb4a016a5aa9c88e058a08dc059c400107acfa4))
* updating label for actor tab ([9d081fd](https://github.com/EthanJWright/foundryvtt-importer/commit/9d081fda139e6ea15f003113c66c15d05608bd4d))

### [0.1.11](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.1.10...v0.1.11) (2022-01-24)


### Bug Fixes

* adding versionrc ([ab91903](https://github.com/EthanJWright/foundryvtt-importer/commit/ab91903fa6fcc43b57d5ce0230e163bb0f19f471))

### [0.1.10](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.1.9...v0.1.10) (2022-01-24)


### Bug Fixes

* adding stringify-package ([6c24572](https://github.com/EthanJWright/foundryvtt-importer/commit/6c24572342043c0d9919d6c892767f7d92802bf5))

### [0.1.9](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.1.8...v0.1.9) (2022-01-24)


### Bug Fixes

* publish token ([f5017b5](https://github.com/EthanJWright/foundryvtt-importer/commit/f5017b53e1ad1f6b57e16611d101a8a9c2005ac6))
* release ([40b0379](https://github.com/EthanJWright/foundryvtt-importer/commit/40b03795bd3e9801c1cb3fffcc1dc4dfe9e6fa61))

### [0.1.8](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.1.6...v0.1.8) (2022-01-24)


### Bug Fixes

* trying swapping the order ([0c88561](https://github.com/EthanJWright/foundryvtt-importer/commit/0c8856168b09f7798b85f8db2b01a62c0ae86c8d))

### [0.1.6](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.1.4...v0.1.6) (2022-01-24)


### Bug Fixes

* having release run patch script ([e3a3f21](https://github.com/EthanJWright/foundryvtt-importer/commit/e3a3f210dc12c8fe5065d1b3b24b3a6145380243))
* removing github version bump ([a2b7067](https://github.com/EthanJWright/foundryvtt-importer/commit/a2b70672fbd4a333d2939120cc53db3d4423de62))

### [0.1.4](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.1.2...v0.1.4) (2022-01-24)


### Bug Fixes

* working on version bump flow ([783a02d](https://github.com/EthanJWright/foundryvtt-importer/commit/783a02db62b7882a01ad744993f768a8a4149c05))

### [0.1.2](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.1.1...v0.1.2) (2022-01-24)


### Bug Fixes

* download url ([ca48499](https://github.com/EthanJWright/foundryvtt-importer/commit/ca48499278b4d5150d701f53374e43c02dc7046d))

### [0.1.1](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.0.4...v0.1.1) (2022-01-24)


### Features

* add setting for actor importer in config ([dd58bf8](https://github.com/EthanJWright/foundryvtt-importer/commit/dd58bf8227cdc98f6229dbd74931f630d5c48822))
* configure table button through settings ([a8ab2a1](https://github.com/EthanJWright/foundryvtt-importer/commit/a8ab2a176b38b4eeda180099d8348be0467e6282))
* starting 0.1.0 release ([d5d2deb](https://github.com/EthanJWright/foundryvtt-importer/commit/d5d2deb614f48819d50a6cf802adc8efde80d760))


### Bug Fixes

* be more explicit in folder depth docs ([9c01ed1](https://github.com/EthanJWright/foundryvtt-importer/commit/9c01ed1ad7461c45dbdef7dd26e071c17ec152eb))

### [0.0.4](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.0.3...v0.0.4) (2022-01-23)


### Bug Fixes

* adding module.json to release ([c69e46c](https://github.com/EthanJWright/foundryvtt-importer/commit/c69e46c49d5e847fc3b3df1ba07c02c7d8d0d9aa))
* adding rollup copy ([82f6b2a](https://github.com/EthanJWright/foundryvtt-importer/commit/82f6b2ab6243b8e23136a323a58680a83c4558ea))
* defining src and dist ([8dccf5c](https://github.com/EthanJWright/foundryvtt-importer/commit/8dccf5cf0cc12d8ffe68f371e157ec0005832927))
* import to require ([989227f](https://github.com/EthanJWright/foundryvtt-importer/commit/989227ff12e0174c66d579adf42398a3066f93b3))
* updating PAT for repo ([a2e7877](https://github.com/EthanJWright/foundryvtt-importer/commit/a2e7877bc9a49e6b7da38239d6f7a04276c58bdb))

### [0.0.3](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.0.2...v0.0.3) (2022-01-23)

### [0.0.2](https://github.com/EthanJWright/foundryvtt-importer/compare/v0.0.1...v0.0.2) (2022-01-23)


### Features

* add action parsing ([2599fc5](https://github.com/EthanJWright/foundryvtt-importer/commit/2599fc5a4b9a0a2cd9f6c6f3a8b29cc32b6825a5))
* add health extractor ([0065a13](https://github.com/EthanJWright/foundryvtt-importer/commit/0065a13c17400972b0dd334247c378d8770f9d10))
* add in reaction ([e8e8832](https://github.com/EthanJWright/foundryvtt-importer/commit/e8e8832b4979c281930ad4cc580b1f2893ea1c65))
* add skill parsing ([9727d09](https://github.com/EthanJWright/foundryvtt-importer/commit/9727d09d5c21f4d76c220545e09f448240e9e13a))
* adding AC parsing ([293af1d](https://github.com/EthanJWright/foundryvtt-importer/commit/293af1d345ddbe0715ad34d5eefda1e223507741))
* adding allFeature collection to remove reliance on sections ([16a7ec3](https://github.com/EthanJWright/foundryvtt-importer/commit/16a7ec3a3685c318f8047575455215de8804203a))
* adding damage and attack to item ([4a6551d](https://github.com/EthanJWright/foundryvtt-importer/commit/4a6551d9e59cc40e7300fb907610707b57dc8d99))
* adding feats and actions as items ([11977c6](https://github.com/EthanJWright/foundryvtt-importer/commit/11977c638a5e7c2619916f9fdef03c12b49790a3))
* basic damage parsing ([a4a63dd](https://github.com/EthanJWright/foundryvtt-importer/commit/a4a63dddd330080a8ac13fc5f6d677c14bf06d69))
* enable fraction based challenge ratings ([a08b8c1](https://github.com/EthanJWright/foundryvtt-importer/commit/a08b8c18b5e112d3bf488d863347bad1c3f6aff9))
* extract challenge rating and xp ([05bbc05](https://github.com/EthanJWright/foundryvtt-importer/commit/05bbc059957883736bf54b3e6cf77a3f03340b7e))
* extract speed ([9e80fd4](https://github.com/EthanJWright/foundryvtt-importer/commit/9e80fd40dad3afd232f1883ee8be95a93095b6da))
* extract stats ([3b9437a](https://github.com/EthanJWright/foundryvtt-importer/commit/3b9437aef03042efa8bccba75978875b5f27de82))
* find where skills start in text ([bfeb4aa](https://github.com/EthanJWright/foundryvtt-importer/commit/bfeb4aac7e44886f57087ee80176f23df150a2e4))
* function to find first action index ([07b8964](https://github.com/EthanJWright/foundryvtt-importer/commit/07b89642712394cbc63ed8bd25f9218f9c23fb58))
* made feature parsing much more dynamic ([8bbd5ed](https://github.com/EthanJWright/foundryvtt-importer/commit/8bbd5ede372d2fa8caf83ba20e51c7249a34bd39))
* parse abilities in format of abil new line value ([8a0316d](https://github.com/EthanJWright/foundryvtt-importer/commit/8a0316d59f0ec0e4cdeab7c693629ea178fb06fd))
* parse features ([153d5a0](https://github.com/EthanJWright/foundryvtt-importer/commit/153d5a0cc97695432e3f6cae61f36af56d1a64bb))
* parsing of abilities, stats, health, ac ([4559d3c](https://github.com/EthanJWright/foundryvtt-importer/commit/4559d3c262256cc849e08874a61a70972ab2f4f7))
* scaffolding for actor implementation ([b9f768f](https://github.com/EthanJWright/foundryvtt-importer/commit/b9f768fa85ea9989f22b0251098d69f65cc09187))
* starting to bind conversion to foundry api ([c434e9d](https://github.com/EthanJWright/foundryvtt-importer/commit/c434e9d51ceccb556f64cdcb8497e4bd4575151e))


### Bug Fixes

* able to build swashbuckler with feats and items ([859f989](https://github.com/EthanJWright/foundryvtt-importer/commit/859f98934b4512598af607121f7eab77f4873120))
* add weapon info ([8deb6f7](https://github.com/EthanJWright/foundryvtt-importer/commit/8deb6f7812bccb0a5ee116044e62ff8b037d5f80))
* adding other files related to binding ([033f8d1](https://github.com/EthanJWright/foundryvtt-importer/commit/033f8d13a4910d130156407598c5cb5f366044fc))
* adding sidebar impl ([88bf0c4](https://github.com/EthanJWright/foundryvtt-importer/commit/88bf0c43c41c221bed0c89d0fbdb5d049c2f41f9))
* adjusting weapon attack formula ([2432f55](https://github.com/EthanJWright/foundryvtt-importer/commit/2432f553e7b0da6718f6e4e7cadc3ec8f2bdb263))
* allow multiple feature headers ([eb15180](https://github.com/EthanJWright/foundryvtt-importer/commit/eb1518058ca285495f31b564da8e8139140576e6))
* filling out module.json ([87f67bb](https://github.com/EthanJWright/foundryvtt-importer/commit/87f67bbe827cb38212370d38255b3c59d112e58c))
* handle monsters with no specific armor type ([b35eb90](https://github.com/EthanJWright/foundryvtt-importer/commit/b35eb90540d3011729b1dc54d4ddce7e3067063b))
* refactor to make reaction easier ([a6ca766](https://github.com/EthanJWright/foundryvtt-importer/commit/a6ca76683c64bab606aecaf1500890710f332540))
* remove any ([02c231e](https://github.com/EthanJWright/foundryvtt-importer/commit/02c231e56fa93a8ded3398099fc78bbf9c6352fe))
* removing reference to get weapon ability ([4ac49a4](https://github.com/EthanJWright/foundryvtt-importer/commit/4ac49a4faa0f4537eb217281e20580b963cc1a89))
* removing requirement for skills ([943b779](https://github.com/EthanJWright/foundryvtt-importer/commit/943b779c2d1b1a19ddc5de3eb873c82849ff2141))
* rename to features ([0627ced](https://github.com/EthanJWright/foundryvtt-importer/commit/0627cedc0084569b74d11b0cf79fbcebe1f5263e))
* returning formula string as well ([9c43ccd](https://github.com/EthanJWright/foundryvtt-importer/commit/9c43ccd14ce86337dbe24691d1d2f02390a951dc))
* spacing, only use all feature collection ([2e7317f](https://github.com/EthanJWright/foundryvtt-importer/commit/2e7317f408c918b0e6937d4d2607e9d24eb87809))
* specifically matching on actions as line contents ([1210d55](https://github.com/EthanJWright/foundryvtt-importer/commit/1210d559404c6e965d9856e64a6128a3c1794ff6))
* this seemed to work on last release, so rolling back ([d10021a](https://github.com/EthanJWright/foundryvtt-importer/commit/d10021aaa5d6b7fd20ee5b50698015976a584f6b))
* typo ([7504c81](https://github.com/EthanJWright/foundryvtt-importer/commit/7504c8113058b1c7129525ab2bdece1f0cb3d2d4))
* underscoring unused events ([05a222a](https://github.com/EthanJWright/foundryvtt-importer/commit/05a222aede6048e0a50bf396c4cadec2481c6533))
* update foundry version ([595dbd5](https://github.com/EthanJWright/foundryvtt-importer/commit/595dbd595b64bcfd70f696500f3c7d8253ad1469))
* updating docs ([f6e113c](https://github.com/EthanJWright/foundryvtt-importer/commit/f6e113c4f3a197c07d01eb2855aaaeb15f4a3004))
* updating release flow to use main ([89caae8](https://github.com/EthanJWright/foundryvtt-importer/commit/89caae890e0d2c0a0b3620b02dd4dc3289af83bf))
* verify feature names are at start of line ([44e2fd8](https://github.com/EthanJWright/foundryvtt-importer/commit/44e2fd84e635da536c2f5de411bc8030590075a2))

### 0.0.1 (2021-12-01)


### Features

* accommodate for note structure that includes tags ([d88704a](https://github.com/EthanJWright/foundryvtt-importer/commit/d88704a2dfbd49717d296c39b25757de4b0ec684))
* add interface for userdata, form for clipboard input ([c5998b3](https://github.com/EthanJWright/foundryvtt-importer/commit/c5998b3350eb1c847838377bf5ab572e87aec53c))
* adding configuration for folder depth ([9589c90](https://github.com/EthanJWright/foundryvtt-importer/commit/9589c90415e585654321e84a0428c6a417445bd4))
* adding parser for reddit tables ([14f3ae4](https://github.com/EthanJWright/foundryvtt-importer/commit/14f3ae41353b368cd780f0d96cd24f8a8237772c))
* adding table importer ([7691ad7](https://github.com/EthanJWright/foundryvtt-importer/commit/7691ad7f39dc98b6f36db8bb4d495f8dce82da5a))
* allow max depth as an option ([c0a5cc0](https://github.com/EthanJWright/foundryvtt-importer/commit/c0a5cc00a101842a86c13d1e42b93b9338baf91b))
* allowing option to parse tables without a formula ([49ad248](https://github.com/EthanJWright/foundryvtt-importer/commit/49ad2487eb178345cc966740f9c4d3da94f7b1da))
* can load any type of data from clipboard ([99649e1](https://github.com/EthanJWright/foundryvtt-importer/commit/99649e13fdadbac20a9da56f1696b3e93bda2da7))
* can now load json dynamically from Data ([b649c1c](https://github.com/EthanJWright/foundryvtt-importer/commit/b649c1c902dfa21ded1ecd8ae5a8851e19fa51b2))
* convert lists into html lists ([b6153b4](https://github.com/EthanJWright/foundryvtt-importer/commit/b6153b4b7a0262a93b0d5548ac56ccdb60832d5d))
* create table from a txt file based on new lines ([ad3e64d](https://github.com/EthanJWright/foundryvtt-importer/commit/ad3e64d4b0af3e32b7356a7ce089a63c1f7e4a1c))
* enable CSV table parsing ([4003016](https://github.com/EthanJWright/foundryvtt-importer/commit/4003016d4f1af8e41cb1b68511d16cedd5bfa8ec))
* file detectors added, with tests ([a896d18](https://github.com/EthanJWright/foundryvtt-importer/commit/a896d181569eae992e64517473048e237dcc3495))
* hiding the journal importer behind a configuration value ([141a204](https://github.com/EthanJWright/foundryvtt-importer/commit/141a20463550bc1ccfcb082bb7b34bceb64038b4))
* only load plugin if the user is the GM ([b48730e](https://github.com/EthanJWright/foundryvtt-importer/commit/b48730e20818c1c3d465cdcd0ac1bdb20c125734))
* pushing workflows ([4e60cc2](https://github.com/EthanJWright/foundryvtt-importer/commit/4e60cc24c6f424f1aef0626675606d69791a64e3))
* support for weights reddit table importing ([3cc6fa4](https://github.com/EthanJWright/foundryvtt-importer/commit/3cc6fa4ad6f31b06abdd9048b7f0692fba241ff9))


### Bug Fixes

* add sort index to folder items ([f9dc87d](https://github.com/EthanJWright/foundryvtt-importer/commit/f9dc87d110da664ac35bf3266f6982174df6432b))
* bind reddit parser to foundry ([213c753](https://github.com/EthanJWright/foundryvtt-importer/commit/213c75379c2ac8cfd61de158a5e4cfab7c4faa43))
* cleaning unecessary artifacts ([b4ea26b](https://github.com/EthanJWright/foundryvtt-importer/commit/b4ea26b0d253803b33d1a9cd3e9cf32fab11ec28))
* currently broken but closer to weighted impl ([4f3bf60](https://github.com/EthanJWright/foundryvtt-importer/commit/4f3bf608d0068ba70a33dcffceee6ded179aa8f8))
* dont treat very small headers as h2 ([f813408](https://github.com/EthanJWright/foundryvtt-importer/commit/f8134083333bdd857be565a617b3fce9bb9ef5eb))
* json in docs ([900b3e7](https://github.com/EthanJWright/foundryvtt-importer/commit/900b3e7e55cc94107a624e4903ee3634faaa2bbb))
* move examples under journal section ([27cda14](https://github.com/EthanJWright/foundryvtt-importer/commit/27cda14daeb79f04fe1f380c2277b429dbccb801))
* reference depth starting at 1 ([fe80629](https://github.com/EthanJWright/foundryvtt-importer/commit/fe80629b8235d589faf0ef8fb7ac69054c261c64))
* remove space ([07cf338](https://github.com/EthanJWright/foundryvtt-importer/commit/07cf338201d4aba79dbfc802bcde2e51b79e530a))
* rename test ([51b4f56](https://github.com/EthanJWright/foundryvtt-importer/commit/51b4f56e025deb3119a0cab61efc60a9ba9ffd0a))
* rephrase forms to capture new behavior ([8c3adf7](https://github.com/EthanJWright/foundryvtt-importer/commit/8c3adf7b23508cc8c84fdc2df80f84a4f3820cc8))
* set all headers to h2 ([297bf6f](https://github.com/EthanJWright/foundryvtt-importer/commit/297bf6facaadeb760577ebdd23be9dafe800e108))
* splitting on first d ([f6c8652](https://github.com/EthanJWright/foundryvtt-importer/commit/f6c8652366078c26025b59a07916c96e256a5504))
* table folder manual sorting ([83c1a73](https://github.com/EthanJWright/foundryvtt-importer/commit/83c1a731d09bad883c440983ef3dd2a57f063117))
* trying to reference different gh token ([e39a5e4](https://github.com/EthanJWright/foundryvtt-importer/commit/e39a5e48718e37ca67a253f8c929a8d20c720032))
* unit test now breaks in way it should ([12753bc](https://github.com/EthanJWright/foundryvtt-importer/commit/12753bc009f1864d3679da26d177128c2bd4dcf8))
* update name clean to support %20 removal ([2fb6069](https://github.com/EthanJWright/foundryvtt-importer/commit/2fb60698e3f880b37ad717f5da3866349e7c9470))
