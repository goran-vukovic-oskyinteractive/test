USE [DB_52806_mercury]
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_NodeTreeNode]') AND parent_object_id = OBJECT_ID(N'[dbo].[DMTree]'))
ALTER TABLE [dbo].[DMTree] DROP CONSTRAINT [FK_NodeTreeNode]
GO

USE [DB_52806_mercury]
GO

/****** Object:  Table [dbo].[DMTree]    Script Date: 02/16/2013 21:07:14 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DMTree]') AND type in (N'U'))
DROP TABLE [dbo].[DMTree]
GO

USE [DB_52806_mercury]
GO

/****** Object:  Table [dbo].[DMTree]    Script Date: 02/16/2013 21:07:14 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[DMTree](
	[NodeId] [int] NOT NULL,
	[ParentId] [int] NOT NULL,
	[Level] [int] NOT NULL,
 CONSTRAINT [PK_Tree] PRIMARY KEY CLUSTERED 
(
	[NodeId] ASC,
	[ParentId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
 CONSTRAINT [UK_Level] UNIQUE NONCLUSTERED 
(
	[NodeId] ASC,
	[Level] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[DMTree]  WITH CHECK ADD  CONSTRAINT [FK_NodeTreeNode] FOREIGN KEY([NodeId])
REFERENCES [dbo].[DMNode] ([NodeId])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[DMTree] CHECK CONSTRAINT [FK_NodeTreeNode]
GO


insert into dbo.DMNode values (null, 'Unit = 2 RAR')
insert into dbo.DMNode values (1	, 'SIC = SAA')
insert into dbo.DMNode values (2	, 'App1\1 RAR')
insert into dbo.DMNode values (2	, 'App5\1 RAR')
insert into dbo.DMNode values (1	, 'SIC = SAB')
