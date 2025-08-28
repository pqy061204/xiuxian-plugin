import { Image, Text, useSend } from 'alemonjs';
import { redis } from '@src/model/api';
import {
  __PATH,
  getRandomTalent,
  writePlayer,
  writeEquipment,
  writeNajie,
  addHP,
  writeDanyao,
  keysByPath,
  keys
} from '@src/model/index';
import { getDataList } from '@src/model/DataList';
import { selects } from '@src/response/mw';
import { getPlayerImage } from '@src/model/image';
import type { Player } from '@src/types';
import mw from '@src/response/mw';

export const regular = /^(#|＃|\/)?(我|我的练气|个人信息|我的信息|踏入仙途)$/;

interface Talent {
  eff: number;
}

function normalizeTalent(t): Talent {
  if (t && typeof t === 'object') {
    const obj = t;
    const eff = typeof obj.eff === 'number' ? obj.eff : 0;

    return { ...obj, eff };
  }

  return { eff: 0 };
}

async function pickEquip(name: string) {
  const equipmentData = await getDataList('Equipment');

  return equipmentData.find(i => i.name === name) || null;
}

const res = onResponse(selects, async e => {
  const Send = useSend(e);
  const usr_qq = e.UserId;
  const ex = await redis.exists(keys.player(usr_qq));

  if (ex > 0) {
    const img = await getPlayerImage(e as Parameters<typeof getPlayerImage>[0]);

    if (Buffer.isBuffer(img)) {
      void Send(Image(img));

      return;
    }
    void Send(Text('图片加载失败'));

    return;
  }
  // 玩家计数：使用 redis key 数量作为序号（若需精确可改为读取文件系统）
  const userList = await keysByPath(__PATH.player_path);
  const n = userList.length + 1;
  const talentRaw = await getRandomTalent();
  const talent = normalizeTalent(talentRaw);
  const new_player = {
    id: usr_qq,
    sex: '0',
    名号: `路人甲${n}号`,
    宣言: '这个人很懒还没有写',
    avatar: e.UserAvatar || 'https://s1.ax1x.com/2022/08/09/v8XV3q.jpg',
    level_id: 1,
    Physique_id: 1,
    race: 1,
    修为: 1,
    血气: 1,
    灵石: 10000,
    灵根: talent as Player['灵根'],
    神石: 0,
    favorability: 0,
    breakthrough: false,
    linggen: [],
    linggenshow: 1,
    学习的功法: [],
    修炼效率提升: talent.eff,
    连续签到天数: 0,
    攻击加成: 0,
    防御加成: 0,
    生命加成: 0,
    power_place: 1,
    当前血量: 8000,
    lunhui: 0,
    lunhuiBH: 0,
    轮回点: 10,
    occupation: [],
    occupation_level: 1,
    镇妖塔层数: 0,
    神魄段数: 0,
    魔道值: 0,
    仙宠: {
      name: '',
      type: '',
      加成: 0,
      灵魂绑定: 0
    },
    练气皮肤: 0,
    装备皮肤: 0,
    幸运: 0,
    addluckyNo: 0,
    师徒任务阶段: 0,
    师徒积分: 0,
    血量上限: 0,
    攻击: 0,
    防御: 0,
    暴击率: 0,
    暴击伤害: 0
  } as Player;

  await writePlayer(usr_qq, new_player);
  const new_equipment = {
    武器: await pickEquip('烂铁匕首'),
    护具: await pickEquip('破铜护具'),
    法宝: await pickEquip('廉价炮仗')
  };

  await writeEquipment(usr_qq, new_equipment);
  const new_najie = {
    等级: 1,
    灵石上限: 5000,
    灵石: 0,
    装备: [],
    丹药: [],
    道具: [],
    功法: [],
    草药: [],
    材料: [],
    仙宠: [],
    仙宠口粮: [],
    武器: null,
    护具: null,
    法宝: null
  };

  await writeNajie(usr_qq, new_najie);
  await addHP(usr_qq, 999999);
  const danyaoInit = {
    biguan: 0,
    biguanxl: 0,
    xingyun: 0,
    lianti: 0,
    ped: 0,
    modao: 0,
    beiyong1: 0,
    beiyong2: 0,
    beiyong3: 0,
    beiyong4: 0,
    beiyong5: 0
  };

  await writeDanyao(usr_qq, danyaoInit);
  const img = await getPlayerImage(e);

  if (Buffer.isBuffer(img)) {
    void Send(Image(img));

    return false;
  }
  void Send(Text('图片加载失败'));

  return false;
});

export default onResponse(selects, [mw.current, res.current]);
