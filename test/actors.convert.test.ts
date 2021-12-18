import { actorToFifth } from '../src/module/actors.convert';
import { swashbuckler } from './mock.swashbuckler';

describe('Parsed Actor to 5th Structure', () => {
  it('should convert a swashbuckler', () => {
    const fifthSwashbuckler = actorToFifth(swashbuckler);
    expect(fifthSwashbuckler.attributes.hp.value).toEqual(66);
    expect(fifthSwashbuckler.attributes.ac.flat).toEqual(17);
    if (!fifthSwashbuckler.skills.acr) throw new Error('Missing ACR');
    expect(fifthSwashbuckler.skills.acr.value).toEqual(8);
  });
});
