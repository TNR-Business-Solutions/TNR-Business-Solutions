/// <reference path="..\masterPage\masterPage.d.ts" />
type PageElementsMap = MasterPageElementsMap & {
	"#Section1Regular": $w.Section;
	"#Section1RegularTitle1": $w.Text;
	"#Section1RegularLongtext1": $w.Text;
	"#Section1RegularMediaImage1": $w.ColumnStrip;
	"#column4": $w.Column;
	"#Section2Regular": $w.Section;
	"#Section2RegularTitle1": $w.Text;
	"#line1": $w.HiddenCollapsedElement;
	"#Section2RegularLongtext1": $w.Text;
	"#Section4List": $w.Section;
	"#Section4ListHeaderTitle1": $w.Text;
	"#line5": $w.HiddenCollapsedElement;
	"#text55": $w.Text;
	"#page1": $w.Page;
}