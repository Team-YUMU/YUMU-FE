import { useState } from 'react';
import { Button } from '../ui/button';

export function AuctionDetailContents() {
  const [activeTab, setActiveTab] = useState<string>('상세페이지');
  const [isMoreView, setIsMoreView] = useState(false);

  const handleMenu = (tab: string) => {
    setActiveTab(tab);
  };

  const handleMore = () => {
    setIsMoreView(!isMoreView);
  };

  return (
    <div className='col-span-2 space-y-2 bg-white'>
      <div className='rounded-xl bg-slate-50 p-2'>
        유의사항 ex. 도서신간 배송 불가 / 실문배송이 아닌 이메일로 상품이 전달 됩니다.
      </div>
      <div className='grid w-full grid-cols-4 gap-2'>
        <Button variant={'secondary'} onClick={() => handleMenu('상세페이지')} className='rounded-none'>
          상세페이지
        </Button>
        <Button variant={'secondary'} onClick={() => handleMenu('작가소개')} className='rounded-none'>
          작가소개
        </Button>
        <Button variant={'secondary'} onClick={() => handleMenu('유의사항')} className='rounded-none'>
          유의사항
        </Button>
        <Button variant={'secondary'} onClick={() => handleMenu('공지글')} className='rounded-none'>
          공지글
        </Button>
      </div>
      <div className='relative bg-slate-50 p-2'>
        <div
          className={`overflow-hidden bg-slate-100 ${activeTab === '상세페이지' ? '' : 'hidden'} ${isMoreView ? 'h-full' : 'h-72'}`}
        >
          <p>상세 페이지</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tortor eros, feugiat at semper eget, venenatis
            ut elit. Aliquam ornare id lorem at commodo. Donec non dignissim velit, vitae ullamcorper augue. Nunc
            elementum augue nec massa sagittis fermentum. Suspendisse et mollis ipsum, ac dignissim lacus. Ut id quam
            mi. Nam viverra turpis sed odio posuere, sed scelerisque justo rutrum. Nunc sed sem sed ante finibus
            viverra. Proin tincidunt convallis nisi at ultrices. Fusce lacinia, lorem non ullamcorper condimentum, eros
            elit suscipit urna, et fringilla risus tellus a ex.
          </p>
          <p>
            Integer tristique et turpis sit amet viverra. Etiam sodales imperdiet arcu, a commodo nisl maximus nec.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas neque eros. Donec et nisi justo.
            Sed venenatis metus in magna scelerisque hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia curae; Phasellus in tincidunt mi.
          </p>
          <p>
            Maecenas viverra, massa vel sodales vehicula, enim magna molestie dolor, at ultrices odio nulla id risus.
            Integer efficitur at elit sed sagittis. Etiam posuere porta tortor sed sagittis. Quisque consectetur tempus
            est sed vehicula. Curabitur vel arcu enim. Phasellus eu viverra erat. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Nunc vitae metus sit amet neque molestie tincidunt
            at id risus. Fusce suscipit viverra dolor, ac porta justo vestibulum sit amet. In sed sagittis ligula.
            Curabitur sit amet porta justo, eu egestas dui. Curabitur faucibus facilisis urna, ac gravida mi gravida ut.
            Pellentesque rhoncus mauris vel quam posuere, eget suscipit quam molestie. Donec tempor felis ante, at porta
            massa venenatis ac. Quisque at mi tristique, congue velit a, eleifend mauris.
          </p>
          <p>
            Proin justo ligula, tempus vel ornare nec, scelerisque nec dolor. Pellentesque vel mollis ante. Morbi vel
            volutpat sapien. Sed blandit venenatis purus, eget ullamcorper nibh ullamcorper sed. Vivamus vulputate eros
            lacus, quis pretium nisi venenatis et. Quisque placerat turpis nec porta volutpat. Vivamus et ante pulvinar,
            hendrerit arcu in, egestas purus. Curabitur blandit, ipsum eget feugiat molestie, purus enim accumsan
            mauris, non malesuada tellus dui eu arcu. Nunc et mi nec dolor volutpat elementum et sed lorem. Integer
            commodo justo augue, quis porttitor turpis lacinia quis. Cras vel justo posuere, consectetur nulla quis,
            consectetur ante. Fusce sit amet arcu eget magna mattis fringilla in at turpis. Curabitur eu egestas quam,
            et interdum purus. Ut efficitur felis magna, a eleifend ex luctus eu. Donec velit lorem, fermentum vitae
            elit in, tristique euismod quam.
          </p>
          <p>
            Donec leo dolor, fringilla ut feugiat sed, feugiat sit amet ex. Etiam porta est faucibus mattis blandit.
            Phasellus orci libero, consectetur sit amet luctus quis, interdum eu urna. Integer varius ac felis ac
            fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Phasellus suscipit massa vitae turpis aliquet, nec fringilla augue varius.
            Quisque ut eros quis eros auctor aliquet vulputate ac orci. Maecenas nisl sem, dignissim convallis auctor
            at, vestibulum sed sem. Vestibulum at porta lectus. Praesent convallis, nisi eu maximus facilisis, urna ante
            tempus massa, id porta sem nibh et magna.
          </p>
        </div>
        <div
          className={`${isMoreView ? 'h-full' : 'h-72'} overflow-hidden bg-slate-100 ${activeTab === '작가소개' ? '' : 'hidden'}`}
        >
          <p>작가소개</p>
          <p>
            모든 국민은 근로의 권리를 가진다. 국가는 사회적·경제적 방법으로 근로자의 고용의 증진과 적정임금의 보장에
            노력하여야 하며, 법률이 정하는 바에 의하여 최저임금제를 시행하여야 한다. 사면·감형 및 복권에 관한 사항은
            법률로 정한다. 재판의 전심절차로서 행정심판을 할 수 있다. 행정심판의 절차는 법률로 정하되, 사법절차가
            준용되어야 한다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은 사항과 법률을 집행하기 위하여 필요한
            사항에 관하여 대통령령을 발할 수 있다. 모든 국민은 종교의 자유를 가진다. 국무총리는 국무위원의 해임을
            대통령에게 건의할 수 있다. 정당은 그 목적·조직과 활동이 민주적이어야 하며, 국민의 정치적 의사형성에
            참여하는데 필요한 조직을 가져야 한다.
          </p>
        </div>
        <div
          className={`${isMoreView ? 'h-full' : 'h-72'} overflow-hidden bg-slate-100 ${activeTab === '유의사항' ? '' : 'hidden'}`}
        >
          <p>유의사항</p>
          <p>
            모든 국민은 근로의 권리를 가진다. 국가는 사회적·경제적 방법으로 근로자의 고용의 증진과 적정임금의 보장에
            노력하여야 하며, 법률이 정하는 바에 의하여 최저임금제를 시행하여야 한다. 사면·감형 및 복권에 관한 사항은
            법률로 정한다. 재판의 전심절차로서 행정심판을 할 수 있다. 행정심판의 절차는 법률로 정하되, 사법절차가
            준용되어야 한다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은 사항과 법률을 집행하기 위하여 필요한
            사항에 관하여 대통령령을 발할 수 있다. 모든 국민은 종교의 자유를 가진다. 국무총리는 국무위원의 해임을
            대통령에게 건의할 수 있다. 정당은 그 목적·조직과 활동이 민주적이어야 하며, 국민의 정치적 의사형성에
            참여하는데 필요한 조직을 가져야 한다.
          </p>
        </div>
        <div
          className={`${isMoreView ? 'h-full' : 'h-72'} overflow-hidden bg-slate-100 ${activeTab === '공지글' ? '' : 'hidden'}`}
        >
          <p>공지글</p>
          <p>
            모든 국민은 근로의 권리를 가진다. 국가는 사회적·경제적 방법으로 근로자의 고용의 증진과 적정임금의 보장에
            노력하여야 하며, 법률이 정하는 바에 의하여 최저임금제를 시행하여야 한다. 사면·감형 및 복권에 관한 사항은
            법률로 정한다. 재판의 전심절차로서 행정심판을 할 수 있다. 행정심판의 절차는 법률로 정하되, 사법절차가
            준용되어야 한다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은 사항과 법률을 집행하기 위하여 필요한
            사항에 관하여 대통령령을 발할 수 있다. 모든 국민은 종교의 자유를 가진다. 국무총리는 국무위원의 해임을
            대통령에게 건의할 수 있다. 정당은 그 목적·조직과 활동이 민주적이어야 하며, 국민의 정치적 의사형성에
            참여하는데 필요한 조직을 가져야 한다.
          </p>
        </div>
        <Button className='mt-2 w-full' variant={'secondary'} onClick={handleMore}>
          {isMoreView ? '줄이기' : '더보기'}
        </Button>
      </div>
    </div>
  );
}
