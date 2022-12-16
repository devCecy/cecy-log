import styled from "@emotion/styled";

const About = () => {
	return (
		<Wrapper>
			<Title>
				안녕하세요, <br />
				프론트엔드 개발자 <Underline>안미현</Underline>입니다.
			</Title>
			<Description>
				제가 속한 <Underline>팀과 서비스가 최고</Underline>가 되길 바랍니다.
				<br />
				<Underline>함께할 때</Underline> 긍정적인 가치를 발견할 수 있다고
				믿습니다.
			</Description>
			<Description>
				<br />
				<Underline>내면과 외면의 성장</Underline>에 관심이 많습니다. <br />
				아웃풋을 위한 <Underline>인풋을 즐기는 것</Underline>을 삶의 낙으로
				여기고 있습니다.
			</Description>
			<Description>
				맥주, 아이스아메리카노, 셜록홈즈, 해리포터를 좋아합니다. <br />
			</Description>
		</Wrapper>
	);
};

export default About;

const Wrapper = styled.div`
	width: 100%;
	text-align: start;
	font-weight: 400;
`;

const Title = styled.div`
	font-size: 16px;
`;

const Description = styled.p``;

const Underline = styled.span`
	width: 100%;
	border-bottom: 2px solid ${({ theme }) => theme.colors.main};
`;
