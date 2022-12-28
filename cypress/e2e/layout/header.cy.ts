describe("헤더 테스트", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000");
	});

	it("메인페이지에 진입하면, 헤더에 DEVCECY LOG 텍스트가 로드된다.", () => {
		cy.visit("/");
		cy.get(".nav-home-btn").should("exist").contains("DEVCECY LOG");
	});
});
